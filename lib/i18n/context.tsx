'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { en, type Translations } from './en'
import { de } from './de'

export type Locale = 'en' | 'de'

const LOCALES: Record<Locale, Translations> = { en, de }
const STORAGE_KEY = 'di:locale'

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Translations
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: en,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
      if (stored && stored in LOCALES) setLocaleState(stored)
    } catch { /* private browsing */ }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* noop */ }
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: LOCALES[locale] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  return useContext(I18nContext)
}
