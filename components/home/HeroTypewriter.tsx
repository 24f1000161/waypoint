'use client'

import { useEffect, useMemo, useState } from 'react'

type Props = { text: string }

function segmentText(text: string) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const Segmenter = Intl.Segmenter as typeof Intl.Segmenter
    return Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(text), (part) => part.segment)
  }
  return Array.from(text)
}

export function HeroTypewriter({ text }: Props) {
  const segments = useMemo(() => segmentText(text), [text])
  const [visibleCount, setVisibleCount] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduced(media.matches)
    updatePreference()
    media.addEventListener('change', updatePreference)
    return () => media.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reduced) {
      setVisibleCount(segments.length)
      return
    }

    let cancelled = false
    let timer: number | undefined
    let index = 0
    const typeNext = () => {
      if (cancelled) return
      index += 1
      setVisibleCount(index)
      if (index < segments.length) {
        const latest = segments[index - 1]
        const pause = /[.!?]/.test(latest) ? 260 : latest === ',' ? 120 : 34
        timer = window.setTimeout(typeNext, pause)
      }
    }

    const frame = window.requestAnimationFrame(typeNext)
    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      if (timer) window.clearTimeout(timer)
    }
  }, [reduced, segments])

  const isComplete = reduced || visibleCount >= segments.length
  const visibleText = segments.slice(0, reduced ? segments.length : visibleCount).join('')

  return (
    <h1 className="hero-headline-text hero-typewriter" aria-label={text}>
      <span aria-hidden="true">{visibleText}</span>
      {!isComplete && <span className="hero-typewriter-cursor" aria-hidden="true" />}
    </h1>
  )
}
