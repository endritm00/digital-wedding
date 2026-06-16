'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

function OrnamentLine({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 140 10" width="120" height="9" aria-hidden="true">
      <line x1="0"   y1="4.5" x2="55"  y2="4.5" stroke={color} strokeWidth="0.5" opacity="0.45" />
      <rect x="64"   y="1.5"  width="6" height="6" transform="rotate(45 67 4.5)" fill={color} opacity="0.45" />
      <rect x="73"   y="1.5"  width="6" height="6" transform="rotate(45 76 4.5)" fill={color} opacity="0.22" />
      <line x1="85"  y1="4.5" x2="140" y2="4.5" stroke={color} strokeWidth="0.5" opacity="0.45" />
    </svg>
  )
}

export function FinalCta() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative min-h-[65dvh] flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden"
      style={{ background: '#EDE5DA' }}
      aria-label="Final call to action"
    >
      {/* Wedding photo background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/videos/8776108/pexels-photo-8776108.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Bride and groom sharing a loving gaze"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Warm overlay to keep brand palette */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(237,229,218,0.84)' }}
        />
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <OrnamentLine color="#1A1A1A" />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="flex flex-col items-center gap-3"
        >
          <span
            className="font-inter tracking-[0.28em] uppercase"
            style={{ fontSize: 9, color: 'rgba(26,26,26,0.28)' }}
          >
            Your story
          </span>
          <h2
            className="font-cormorant font-light italic text-[#1A1A1A] leading-none"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 5.8rem)', letterSpacing: '-0.01em', maxWidth: '18ch' }}
          >
            Deserves a beautiful beginning.
          </h2>
        </motion.div>

        <OrnamentLine color="#1A1A1A" />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="flex flex-col sm:flex-row items-center gap-5 mt-4"
        >
          <Link
            href="/builder"
            className="font-inter tracking-[0.22em] uppercase rounded-full transition-all duration-500 hover:scale-105"
            style={{
              fontSize: 10,
              padding: '15px 40px',
              background: '#1A1A1A',
              color: '#F8F4EF',
              boxShadow: '0 4px 24px rgba(26,26,26,0.18)',
            }}
          >
            Reserve your design
          </Link>
          <span
            className="font-inter"
            style={{ fontSize: 10, color: 'rgba(26,26,26,0.3)', letterSpacing: '0.1em' }}
          >
            From €99 · Live in minutes
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
