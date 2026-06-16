'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type InviteCard = {
  type: 'invite'
  bg: string; tc: string; names: string[]
  date: string; x: string; y: string; w: number
  rotation: number; duration: number; delay: number
}

type EnvelopeCard = {
  type: 'envelope'
  bg: string; sealBg: string; initials: string
  x: string; y: string; w: number
  rotation: number; duration: number; delay: number
}

type CardConfig = InviteCard | EnvelopeCard

const CARDS: CardConfig[] = [
  { type: 'invite', bg: '#7B8E72', tc: 'rgba(255,255,255,0.92)', names: ['Emma', '&', 'James'],       date: 'June 14, 2026',  x: '2%',  y: '4%',  w: 130, rotation: -10, duration: 8.5,  delay: 0    },
  { type: 'invite', bg: '#1E2D4A', tc: '#C4A882',                names: ['Sara', '&', 'Ibrahim'],     date: 'Oct 10, 2026',   x: '12%', y: '1%',  w: 138, rotation: 5,   duration: 9.2,  delay: -2.5 },
  { type: 'invite', bg: '#F5E0D8', tc: '#3D2B25',                names: ['Isabelle', '&', 'Jonathan'],date: 'Oct 11, 2026',   x: '72%', y: '2%',  w: 122, rotation: -5,  duration: 10,   delay: -4   },
  { type: 'invite', bg: '#D4B8A8', tc: '#2C1A10',                names: ['Luca', '&', 'Sam'],         date: 'Nov 22, 2026',   x: '83%', y: '3%',  w: 132, rotation: 9,   duration: 7.8,  delay: -1   },
  { type: 'invite', bg: '#2C3E30', tc: 'rgba(250,247,242,0.9)', names: ['Nicola', '&', 'Ed'],         date: 'Oct 28, 2026',   x: '57%', y: '3%',  w: 110, rotation: -4,  duration: 9.8,  delay: -3   },
  { type: 'invite', bg: '#C4908A', tc: '#FAF7F2',                names: ['Amira', '&', 'David'],      date: 'Sept 14, 2026',  x: '44%', y: '1%',  w: 120, rotation: 6,   duration: 8.8,  delay: -5   },
  { type: 'envelope', bg: '#E8E0D2', sealBg: '#C4957A', initials: 'E&J', x: '1%',  y: '57%', w: 122, rotation: 4,   duration: 9,    delay: -1.5 },
  { type: 'envelope', bg: '#8B9E7A', sealBg: '#C4A870', initials: 'S&M', x: '12%', y: '54%', w: 132, rotation: -12, duration: 10.5, delay: -3   },
  { type: 'envelope', bg: '#F2EDE4', sealBg: '#8B5A5A', initials: 'A&D', x: '74%', y: '57%', w: 130, rotation: 10,  duration: 8,    delay: -2   },
  { type: 'envelope', bg: '#D4C0B0', sealBg: '#7A3E2E', initials: 'L&S', x: '85%', y: '60%', w: 118, rotation: -7,  duration: 9.5,  delay: -4   },
]

function InviteCardFace({ card }: { card: InviteCard }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: card.bg, borderRadius: 8, gap: 4, padding: '12px 10px' }}
    >
      <div
        className="font-cormorant italic text-center"
        style={{ color: card.tc, fontSize: card.w > 130 ? 17 : 14, lineHeight: 1.25 }}
      >
        {card.names.map((line, i) => (
          <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
        ))}
      </div>
      <div style={{ width: 18, height: 0.5, background: card.tc, opacity: 0.3, margin: '2px 0' }} />
      <div
        className="font-inter uppercase"
        style={{ color: card.tc, opacity: 0.4, fontSize: 11, letterSpacing: '0.12em' }}
      >
        {card.date}
      </div>
    </div>
  )
}

function EnvelopeCardFace({ card }: { card: EnvelopeCard }) {
  const h = Math.round(card.w * 16 / 9)
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: card.bg, borderRadius: 8 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${card.w} ${h}`}
        aria-hidden="true"
      >
        <line x1="0"       y1="0"  x2={card.w / 2} y2={h / 2} stroke="rgba(0,0,0,0.1)" strokeWidth="0.7" />
        <line x1={card.w}  y1="0"  x2={card.w / 2} y2={h / 2} stroke="rgba(0,0,0,0.1)" strokeWidth="0.7" />
        <line x1="0"       y1={h}  x2={card.w / 2} y2={h / 2} stroke="rgba(0,0,0,0.1)" strokeWidth="0.7" />
        <line x1={card.w}  y1={h}  x2={card.w / 2} y2={h / 2} stroke="rgba(0,0,0,0.1)" strokeWidth="0.7" />
      </svg>
      <div
        className="relative z-10 rounded-full flex items-center justify-center font-cormorant italic"
        style={{ width: 36, height: 36, background: card.sealBg, fontSize: 11, color: 'rgba(255,255,255,0.85)' }}
      >
        {card.initials}
      </div>
    </div>
  )
}

export function FloatingCards() {
  const reduced = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {CARDS.map((card, i) => {
        const h         = Math.round(card.w * 16 / 9)
        const floatDist = 12 + (i % 5) * 2

        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left:     card.x,
              top:      card.y,
              width:    card.w,
              height:   h,
              opacity:  card.type === 'invite' ? 0.19 : 0.14,
              rotate:   card.rotation,
              borderRadius: 8,
            }}
            animate={reduced ? {} : { y: [0, -floatDist, 0] }}
            transition={{
              duration:  card.duration,
              repeat:    Infinity,
              delay:     card.delay,
              ease:      'easeInOut',
            }}
          >
            {card.type === 'invite'
              ? <InviteCardFace   card={card} />
              : <EnvelopeCardFace card={card} />
            }
          </motion.div>
        )
      })}
    </div>
  )
}
