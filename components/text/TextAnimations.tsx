'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { AnimatedText } from './AnimatedText'

export function TypeText({ text, active = true, speed = 22, className = '' }: { text: string; active?: boolean; speed?: number; className?: string }) { return <AnimatedText variant="TYPE" speed={speed} className={`${className} ${active ? '' : 'fx-static'}`}>{text}</AnimatedText> }

export function RollingWord({ value, items }: { value: string; items: string[] }) {
  const index = Math.max(0, items.indexOf(value))
  return <span className="rolling-word" aria-live="polite"><motion.span animate={{ y: `${index * -100}%` }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>{items.map((item) => <span key={item}>{item}</span>)}</motion.span><span className="sr-only">{value}</span></span>
}

export function WaveText({ children, className = '' }: { children: string; className?: string }) {
  const reduced = useReducedMotion()
  return <span className={`wave-text ${reduced ? 'is-reduced' : ''} ${className}`} aria-label={children} aria-hidden="true">{[...children].map((char, index) => <span style={{ '--char-index': index } as React.CSSProperties} key={`${char}-${index}`}>{char === ' ' ? '\u00a0' : char}</span>)}</span>
}

export function MaskLines({ children, className = '' }: { children: ReactNode; className?: string }) { return <span className={`mask-lines ${className}`}>{children}</span> }

export function HighlightSweep({ children }: { children: ReactNode }) { return <mark className="highlight-sweep">{children}</mark> }

export function ScrambleText({ text }: { text: string }) { const reduced = useReducedMotion(); const [value, setValue] = useState(reduced ? text : text.replace(/[^ ]/g, '·')); useEffect(() => { if (reduced) return; let frame = 0; const timer = window.setInterval(() => { frame += 1; setValue(text.split('').map((char, index) => index < frame / 3 || char === ' ' ? char : '·').join('')); if (frame >= text.length * 3) window.clearInterval(timer) }, 35); return () => window.clearInterval(timer) }, [reduced, text]); return <span aria-label={text}>{value}</span> }

export function CharCascade({ children }: { children: string }) { return <span className="char-cascade" aria-label={children} aria-hidden="true">{[...children].map((char, index) => <span style={{ '--char-index': index } as React.CSSProperties} key={`${char}-${index}`}>{char === ' ' ? '\u00a0' : char}</span>)}</span> }
