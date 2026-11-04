'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

export const manifestoSource = 'Most students nearing graduation know they want a next step. Fewer know what to ask for, or who to ask. Informal networks are uneven. Waypoint gives eligible students a structured way to say what they need, and a person who reviews who might help.'
const emphasis = new Set(['what to ask for', 'who to ask', 'a person who reviews'])

export function ManifestoText() {
  const ref = useRef<HTMLParagraphElement>(null)
  const [progress, setProgress] = useState(1)
  const parts = useMemo(() => manifestoSource.split(/(what to ask for|who to ask|a person who reviews)/g), [])
  const words = useMemo(() => manifestoSource.split(' '), [])
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const update = () => {
      const rect = node.getBoundingClientRect()
      const range = Math.max(window.innerHeight, node.offsetHeight)
      const raw = (window.innerHeight * .82 - rect.top) / (range * 1.25)
      setProgress(Math.min(1, Math.max(0, raw)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    if (process.env.NODE_ENV !== 'production') {
      const normalized = (node.textContent || '').replace(/\s+/g, ' ').trim()
      if (normalized && normalized !== manifestoSource) console.warn('[v0] Manifesto text mismatch', { normalized, expected: manifestoSource })
    }
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || progress < .92 || !ref.current) return
    const check = () => {
      if (!ref.current) return
      const normalized = (ref.current.textContent || '').replace(/\s+/g, ' ').trim()
      const tokens = [...ref.current.querySelectorAll<HTMLElement>('.manifesto-token')]
      tokens.forEach((word) => { word.style.setProperty('opacity', '1', 'important') })
      if (normalized !== manifestoSource) console.warn('[v0] Manifesto final-state check failed', { normalized, expected: manifestoSource })
    }
    const frame = window.requestAnimationFrame(check)
    return () => window.cancelAnimationFrame(frame)
  }, [progress])
  const cursor = progress >= .92 ? words.length : Math.floor(Math.min(1, progress / .8) * words.length)
  let wordIndex = 0
  return <>
    <p ref={ref} className="manifesto-stable" aria-hidden="true">{parts.map((part, partIndex) => { const isPhrase = emphasis.has(part); const tokens = part.split(/(\s+)/); return <span className={isPhrase ? 'manifesto-phrase-group' : undefined} key={`${part}-${partIndex}`}>{tokens.map((token, tokenIndex) => { if (/\s+/.test(token)) return <span key={`${partIndex}-space-${tokenIndex}`}>{token}</span>; const index = wordIndex++; const state = index < cursor - 1 ? 'is-read' : index <= cursor + 1 ? 'is-reading' : 'is-unread'; return <span className={`manifesto-token ${state}`} key={`${partIndex}-${tokenIndex}-${token}`}>{isPhrase ? <em>{token}</em> : token}</span> })}</span> })}<i className="manifesto-caret" style={{ left: `${Math.min(99, (cursor / words.length) * 100)}%` }} /></p>
    <p className="sr-only">{manifestoSource}</p>
  </>
}
