'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Wraps each step page so navigating between steps cross-fades the sheet: the
// incoming step fades/slides in over the outgoing one.
//
// NOTE: we deliberately do NOT use `mode="wait"`. With wait-mode the incoming
// step is held until the outgoing exit animation completes — and on rapid
// back/forth navigation an interrupted exit could leave AnimatePresence stuck
// with NOTHING mounted (the "UI disappears until refresh" bug). In the default
// (sync) mode the incoming step mounts immediately and, being opaque, simply
// covers the outgoing one as it fades — robust against any nav timing.
export function StepTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial={reduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
