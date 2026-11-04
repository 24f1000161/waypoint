'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from 'react'

type Variant = 'TYPE' | 'TYPE_SEQUENCE' | 'SCRAMBLE' | 'MASK_LINES' | 'WORD_RISE' | 'CHAR_CASCADE' | 'WAVE' | 'HIGHLIGHT' | 'ROLL' | 'STRIKE'
type Props = { as?: ElementType; children: string; variant?: Variant; speed?: 'fast' | 'slow' | number; delay?: number; className?: string; replayKey?: string | number }
type FxContextValue = { observe: (element: HTMLElement | null) => void; reduced: boolean }
const FxContext = createContext<FxContextValue | null>(null)

function delays(text: string, variant: Variant, speed: Props['speed'], delay: number) {
  const base = typeof speed === 'number' ? speed : speed === 'slow' ? 38 : speed === 'fast' ? 14 : variant === 'TYPE' ? 22 : 35
  const pieces = variant === 'WORD_RISE' || text.length > 140 ? text.split(/(\s+)/) : [...text]
  let elapsed = delay
  return pieces.map((piece, index) => { const value = elapsed; if (variant === 'TYPE' || variant === 'TYPE_SEQUENCE') elapsed += base + (piece === ',' ? 120 : /[.!?]/.test(piece) ? 260 : 0); else elapsed += base; return { piece, index, value } })
}

export function FxProvider({ children }: { children: ReactNode }) {
  const observer = useRef<IntersectionObserver | null>(null)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update(); media.addEventListener('change', update)
    document.documentElement.classList.add('fx-ready')
    observer.current = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.setAttribute('data-state', 'in'); observer.current?.unobserve(entry.target) } }), { threshold: .25, rootMargin: '0px 0px -10% 0px' })
    const failSafe = window.setTimeout(() => document.querySelectorAll('[data-fx][data-state="pending"]').forEach((node) => node.setAttribute('data-state', 'in')), 4000)
    const forceVisible = () => document.querySelectorAll('[data-fx][data-state="pending"]').forEach((node) => node.setAttribute('data-state', 'in'))
    window.addEventListener('pagehide', forceVisible); window.addEventListener('pageshow', forceVisible); document.addEventListener('visibilitychange', forceVisible)
    return () => { media.removeEventListener('change', update); observer.current?.disconnect(); window.clearTimeout(failSafe); window.removeEventListener('pagehide', forceVisible); window.removeEventListener('pageshow', forceVisible); document.removeEventListener('visibilitychange', forceVisible) }
  }, [])
  const value = useMemo(() => ({ reduced, observe: (element: HTMLElement | null) => { if (!element) return; if (reduced || element.getBoundingClientRect().top < window.innerHeight * 1.1) element.setAttribute('data-state', 'in'); else observer.current?.observe(element) } }), [reduced])
  return <FxContext.Provider value={value}>{children}<noscript><style>{'[data-fx]{opacity:1!important;transform:none!important;clip-path:none!important}'}</style></noscript></FxContext.Provider>
}

export function AnimatedText({ as: Tag = 'span', children, variant = 'WORD_RISE', speed, delay = 0, className = '', replayKey }: Props) {
  const context = useContext(FxContext)
  const ref = useRef<HTMLElement>(null)
  const pieces = useMemo(() => delays(children, variant, speed, delay), [children, variant, speed, delay])
  useEffect(() => { context?.observe(ref.current) }, [context, replayKey, children])
  const content = pieces.map(({ piece, index, value }) => /\s+/.test(piece) ? <span className="fx-space" key={`${index}-space`}>{piece}</span> : <span aria-hidden="true" style={{ '--i': index, '--d': `${value}ms` } as React.CSSProperties} key={`${index}-${piece}`}>{piece}</span>)
  return <Tag ref={ref} className={`fx-text fx-${variant.toLowerCase()} ${className}`} data-fx data-state="pending" aria-label={children} key={replayKey}>{content}</Tag>
}

export type { Variant as AnimatedTextVariant }
