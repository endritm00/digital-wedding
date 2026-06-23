'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  api,
  type ExtraCatalogItem,
  type Invite,
  type InviteExtra,
  type InvitePatch,
  type MediaAsset,
  type Plan,
  type Quote,
  type Section,
  type Theme,
} from '@/lib/builder/api'

export type SaveState = 'idle' | 'saving' | 'saved' | 'error'

interface BuilderContextValue {
  inviteId: string
  invite: Invite | null
  sections: Section[]
  plan: Plan | null
  theme: Theme | null
  extrasCatalog: ExtraCatalogItem[]
  inviteExtras: InviteExtra[]
  media: MediaAsset[]
  loading: boolean
  loadError: string | null

  // Draft fields — optimistic merge, debounced 800ms PATCH
  patchDraft: (fields: InvitePatch) => void
  // Force any pending debounced save to fire now (e.g. before navigation)
  flushDraft: () => Promise<void>

  // The 'opening' section holds names/video/music presentation config
  opening: Section | null
  setOpening: (partial: Record<string, unknown>) => void

  addContentSection: (type: string) => Promise<void>
  removeContentSection: (type: string) => Promise<void>
  // Optimistic, per-type serialized toggle — flips instantly, never drops a tap.
  toggleContentSection: (type: string) => void
  updateSectionConfig: (sectionId: string, config: Record<string, unknown>) => void

  toggleExtra: (item: ExtraCatalogItem) => Promise<void>

  refreshQuote: () => Promise<void>
  refreshMedia: () => Promise<void>
  setMediaAsset: (asset: MediaAsset) => void
}

const BuilderContext = createContext<BuilderContextValue | null>(null)

export function useBuilder(): BuilderContextValue {
  const ctx = useContext(BuilderContext)
  if (!ctx) throw new Error('useBuilder must be used within BuilderProvider')
  return ctx
}

// Volatile, frequently-changing status lives in its OWN context so its churn
// (autosave saving→saved→idle, quote refreshes) doesn't rebuild the main context
// value and re-render the heavy InvitePreview on every edit. Only the small
// status indicators (Hairline save badge, TotalPill, review price) read it.
interface BuilderStatusValue {
  saveState: SaveState
  quote: Quote | null
}
const BuilderStatusContext = createContext<BuilderStatusValue | null>(null)

export function useBuilderStatus(): BuilderStatusValue {
  const ctx = useContext(BuilderStatusContext)
  if (!ctx) throw new Error('useBuilderStatus must be used within BuilderProvider')
  return ctx
}

const AUTOSAVE_MS = 800

export function BuilderProvider({
  inviteId,
  children,
}: {
  inviteId: string
  children: React.ReactNode
}) {
  const [invite, setInvite] = useState<Invite | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [quote, setQuote] = useState<Quote | null>(null)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [theme, setTheme] = useState<Theme | null>(null)
  const [extrasCatalog, setExtrasCatalog] = useState<ExtraCatalogItem[]>([])
  const [inviteExtras, setInviteExtras] = useState<InviteExtra[]>([])
  const [media, setMedia] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveState, setSaveState] = useState<SaveState>('idle')

  // ── initial load ───────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [inv, secs, plans, themes, catalog, ext, med] = await Promise.all([
          api.getInvite(inviteId),
          api.listSections(inviteId),
          api.plans(),
          api.themes(),
          api.extrasCatalog().catch(() => [] as ExtraCatalogItem[]),
          api.listExtras(inviteId).catch(() => [] as InviteExtra[]),
          api.listMedia(inviteId).catch(() => [] as MediaAsset[]),
        ])
        if (cancelled) return

        const resolvedPlan = plans.find((p) => p.id === inv.plan_id) ?? plans[0] ?? null

        // Show the builder as soon as the core data is in. The planless-draft plan
        // PATCH and the price quote are NOT needed to render the form, so blocking
        // first paint on them just added two sequential round-trips to every open.
        // Set core state + drop the loading veil now; finish pricing in the background.
        setInvite(inv)
        setSections(secs)
        setPlan(resolvedPlan)
        setTheme(themes.find((t) => t.id === inv.theme_id) ?? null)
        setExtrasCatalog(catalog)
        setInviteExtras(ext)
        setMedia(med)
        setLoading(false)

        // Background: the builder uses a single default plan (no plan-picker step).
        // Drafts are created without a plan_id, so persist the default the first
        // time a planless draft loads (self-heals old drafts too) — then price it.
        void (async () => {
          if (!inv.plan_id && resolvedPlan) {
            try {
              const updated = await api.patchInvite(inviteId, { plan_id: resolvedPlan.id })
              if (!cancelled) setInvite(updated)
            } catch { /* retried on the next edit's autosave */ }
          }
          try {
            const q = await api.getQuote(inviteId)
            if (!cancelled) setQuote(q)
          } catch { /* no plan yet — TotalPill shows its placeholder */ }
        })()
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'load_failed')
          setLoading(false)
        }
      }
    })()
    return () => { cancelled = true }
  }, [inviteId])

  // ── debounced draft autosave ───────────────────────────────────────────────
  const pendingRef = useRef<InvitePatch>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedFadeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flushDraft = useCallback(async () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
    const fields = pendingRef.current
    if (Object.keys(fields).length === 0) return
    pendingRef.current = {}
    setSaveState('saving')
    try {
      const updated = await api.patchInvite(inviteId, fields)
      setInvite(updated)
      setSaveState('saved')
      if (savedFadeRef.current) clearTimeout(savedFadeRef.current)
      savedFadeRef.current = setTimeout(() => setSaveState('idle'), 2000)
    } catch {
      // Put the fields back so the next edit retries them
      pendingRef.current = { ...fields, ...pendingRef.current }
      setSaveState('error')
    }
  }, [inviteId])

  const patchDraft = useCallback((fields: InvitePatch) => {
    setInvite((prev) => (prev ? { ...prev, ...fields } : prev))
    pendingRef.current = { ...pendingRef.current, ...fields }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => { void flushDraft() }, AUTOSAVE_MS)
  }, [flushDraft])

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (savedFadeRef.current) clearTimeout(savedFadeRef.current)
  }, [])

  // ── quote ──────────────────────────────────────────────────────────────────
  const refreshQuote = useCallback(async () => {
    try { setQuote(await api.getQuote(inviteId)) } catch { /* keep last */ }
  }, [inviteId])

  // ── opening section (names/video/music presentation) ──────────────────────
  const opening = useMemo(
    () => sections.find((s) => s.type === 'opening') ?? null,
    [sections]
  )

  const openingPatchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openingCreating = useRef(false)

  const setOpening = useCallback((partial: Record<string, unknown>) => {
    const existing = sections.find((s) => s.type === 'opening')

    if (existing) {
      const merged = { ...existing.config, ...partial }
      setSections((prev) =>
        prev.map((s) => (s.id === existing.id ? { ...s, config: merged } : s))
      )
      // PATCH replaces config wholesale — always send the full merged object
      if (openingPatchTimer.current) clearTimeout(openingPatchTimer.current)
      openingPatchTimer.current = setTimeout(() => {
        setSaveState('saving')
        api.patchSection(inviteId, existing.id, merged)
          .then(() => {
            setSaveState('saved')
            setTimeout(() => setSaveState('idle'), 2000)
          })
          .catch(() => setSaveState('error'))
      }, AUTOSAVE_MS)
      return
    }

    if (openingCreating.current) return
    openingCreating.current = true
    api.addSection(inviteId, 'opening', partial)
      .then((created) => {
        setSections((prev) => [...prev, created])
        void refreshQuote()
      })
      .catch(() => { /* next setOpening retries */ })
      .finally(() => { openingCreating.current = false })
  }, [inviteId, sections, refreshQuote])

  // ── content sections ───────────────────────────────────────────────────────
  const addContentSection = useCallback(async (type: string) => {
    // Optimistic: flip the card instantly with a temp placeholder, then reconcile
    // with the server row (or roll back on failure). Mirrors removeContentSection.
    const tempId = `temp-${type}-${Date.now()}`
    const optimistic = { id: tempId, type, position: 9999, config: {} } as Section
    setSections((prev) => [...prev, optimistic])
    try {
      const created = await api.addSection(inviteId, type)
      setSections((prev) => prev.map((s) => (s.id === tempId ? created : s)))
      void refreshQuote()
    } catch {
      setSections((prev) => prev.filter((s) => s.id !== tempId))  // roll back
    }
  }, [inviteId, refreshQuote])

  const removeContentSection = useCallback(async (type: string) => {
    const target = sections.find((s) => s.type === type)
    if (!target) return
    setSections((prev) => prev.filter((s) => s.id !== target.id))
    try {
      await api.deleteSection(inviteId, target.id)
    } catch {
      setSections((prev) => [...prev, target])  // restore on failure
    }
    void refreshQuote()
  }, [inviteId, sections, refreshQuote])

  // Optimistic toggle that stays smooth under rapid taps. The card flips
  // instantly; the add/delete is reconciled in the BACKGROUND, serialized per
  // section type, so taps are never dropped (no global "busy" lock) and a quick
  // add→remove still deletes the right server row. One section per type.
  const sectionsRef = useRef<Section[]>([])
  useEffect(() => { sectionsRef.current = sections }, [sections])
  // ONE global chain (not per-type): the server appends each section at max(position)+1,
  // so concurrent inserts would collide on position and silently drop. Serializing all
  // ops keeps the optimistic UI instant while the background sync stays race-free.
  const sectionChain = useRef<Promise<unknown>>(Promise.resolve())
  const sectionServerId = useRef(new Map<string, string>())

  const toggleContentSection = useCallback((type: string) => {
    const enqueue = (op: () => Promise<unknown>) => {
      sectionChain.current = sectionChain.current.then(op).catch(() => {})
    }
    const present = sectionsRef.current.some((s) => s.type === type && s.type !== 'opening')

    if (present) {
      const existing = sectionsRef.current.find((s) => s.type === type)!
      sectionsRef.current = sectionsRef.current.filter((s) => s.id !== existing.id)
      setSections((prev) => prev.filter((s) => s.id !== existing.id))
      enqueue(async () => {
        // The add op ahead of us (if any) has recorded the real server id.
        const realId = sectionServerId.current.get(type)
          ?? (existing.id.startsWith('temp-') ? null : existing.id)
        if (realId) {
          await api.deleteSection(inviteId, realId)
          sectionServerId.current.delete(type)
        }
        void refreshQuote()
      })
    } else {
      const tempId = `temp-${type}-${Date.now()}`
      const optimistic = { id: tempId, type, position: 9999, config: {} } as Section
      sectionsRef.current = [...sectionsRef.current, optimistic]
      setSections((prev) => [...prev, optimistic])
      enqueue(async () => {
        try {
          const created = await api.addSection(inviteId, type)
          sectionServerId.current.set(type, created.id)
          sectionsRef.current = sectionsRef.current.map((s) => (s.id === tempId ? created : s))
          setSections((prev) => prev.map((s) => (s.id === tempId ? created : s)))
          void refreshQuote()
        } catch {
          sectionsRef.current = sectionsRef.current.filter((s) => s.id !== tempId)
          setSections((prev) => prev.filter((s) => s.id !== tempId))
        }
      })
    }
  }, [inviteId, refreshQuote])

  const sectionTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const updateSectionConfig = useCallback((sectionId: string, config: Record<string, unknown>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, config } : s))
    )
    const timers = sectionTimers.current
    const existing = timers.get(sectionId)
    if (existing) clearTimeout(existing)
    timers.set(sectionId, setTimeout(() => {
      timers.delete(sectionId)
      setSaveState('saving')
      api.patchSection(inviteId, sectionId, config)
        .then(() => {
          setSaveState('saved')
          setTimeout(() => setSaveState('idle'), 2000)
        })
        .catch(() => setSaveState('error'))
    }, AUTOSAVE_MS))
  }, [inviteId])

  // ── extras ─────────────────────────────────────────────────────────────────
  const toggleExtra = useCallback(async (item: ExtraCatalogItem) => {
    const existing = inviteExtras.find((e) => e.extra_id === item.id)
    if (existing) {
      setInviteExtras((prev) => prev.filter((e) => e.id !== existing.id))
      try { await api.removeExtra(inviteId, existing.id) }
      catch { setInviteExtras((prev) => [...prev, existing]) }
    } else {
      try {
        const added = await api.addExtra(inviteId, item.id)
        setInviteExtras((prev) => [...prev, added])
      } catch { /* leave untoggled */ }
    }
    void refreshQuote()
  }, [inviteId, inviteExtras, refreshQuote])

  // ── media ──────────────────────────────────────────────────────────────────
  const refreshMedia = useCallback(async () => {
    try { setMedia(await api.listMedia(inviteId)) } catch { /* keep last */ }
  }, [inviteId])

  const setMediaAsset = useCallback((asset: MediaAsset) => {
    setMedia((prev) => {
      const idx = prev.findIndex((m) => m.id === asset.id)
      if (idx === -1) return [...prev, asset]
      const next = [...prev]
      next[idx] = asset
      return next
    })
  }, [])

  // Memoized so consumers (notably the heavy InvitePreview) don't re-render when
  // unrelated provider state settles (e.g. the saved→idle timer, a quote refresh).
  // All callbacks are useCallback'd, so listing them as deps is stable; the object
  // identity only changes when something it carries actually changes.
  const value = useMemo<BuilderContextValue>(() => ({
    inviteId,
    invite,
    sections,
    plan,
    theme,
    extrasCatalog,
    inviteExtras,
    media,
    loading,
    loadError,
    patchDraft,
    flushDraft,
    opening,
    setOpening,
    addContentSection,
    removeContentSection,
    toggleContentSection,
    updateSectionConfig,
    toggleExtra,
    refreshQuote,
    refreshMedia,
    setMediaAsset,
  }), [
    inviteId, invite, sections, plan, theme, extrasCatalog, inviteExtras,
    media, loading, loadError, patchDraft, flushDraft, opening,
    setOpening, addContentSection, removeContentSection, toggleContentSection,
    updateSectionConfig, toggleExtra, refreshQuote, refreshMedia, setMediaAsset,
  ])

  // Separate, tiny value — changes on every save/quote tick, but only the small
  // status indicators subscribe to it, so InvitePreview is untouched.
  const statusValue = useMemo<BuilderStatusValue>(() => ({ saveState, quote }), [saveState, quote])

  return (
    <BuilderContext.Provider value={value}>
      <BuilderStatusContext.Provider value={statusValue}>
        {children}
      </BuilderStatusContext.Provider>
    </BuilderContext.Provider>
  )
}
