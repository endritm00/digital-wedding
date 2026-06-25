'use client'

import { useState, useEffect } from 'react'
import { fromPrice, type Currency } from '@/lib/currency'

export function FromPrice({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [currency, setCurrency] = useState<Currency>('eur')

  useEffect(() => {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith('di:currency='))
      ?.split('=')[1] as Currency | undefined
    if (match === 'usd' || match === 'eur') setCurrency(match)
  }, [])

  return (
    <span className={className} style={style}>
      {fromPrice(currency)}
    </span>
  )
}
