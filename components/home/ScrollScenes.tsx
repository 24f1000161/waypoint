'use client'

import { motion, useMotionTemplate, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const sections = ['departure', 'the-gap', 'journey', 'atlas', 'human-loop', 'private', 'mentors', 'faq', 'closing']
const labels: Record<string, string> = { departure: 'Departure', 'the-gap': 'The Gap', journey: 'Journey', atlas: 'Guidance atlas', 'human-loop': 'Human in the loop', private: 'Private by design', mentors: 'Mentors', faq: 'Questions, answered', closing: 'Next step' }

function Reduced({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(media.matches); update(); media.addEventListener('change', update); return () => media.removeEventListener('change', update) }, [])
  return reduced ? null : children
}

export function ScrollSpine() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [current, setCurrent] = useState('departure')
  useEffect(() => { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.getAttribute('data-section') || 'departure')), { rootMargin: '-45% 0px -45% 0px' }); sections.forEach((name) => { const node = document.querySelector(`[data-section="${name}"]`); if (node) observer.observe(node) }); return () => observer.disconnect() }, [])
  return <><Reduced><div className="scroll-spine" aria-hidden="true"><motion.span className="scroll-spine-progress" style={{ scaleY: progress }}/><motion.i className="scroll-spine-dot" style={{ top: useTransform(progress, [0, 1], ['0%', '100%']) }}/><span className="scroll-spine-label">{labels[current]}</span></div><div className="edge-mist"/></Reduced></>
}

export function HeroUnravel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const shift = useTransform(scrollYProgress, [0, 1], [0, 6])
  const inverse = useTransform(shift, (value) => -value)
  const fade = useTransform(scrollYProgress, [0, 1], [1, .7])
  return <Reduced><div ref={ref} className="hero-unravel" aria-hidden="true"><motion.span className="unravel-layer unravel-contours" style={{ x: inverse, opacity: fade }}/><motion.span className="unravel-layer unravel-path" style={{ x: shift, opacity: fade }}/><motion.span className="unravel-layer unravel-fragments" style={{ x: inverse, opacity: fade }}/></div></Reduced>
}

export function KineticDivider({ words, accent = 'var(--marigold)' }: { words: string[]; accent?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['18vw', '-18vw'])
  const reverse = useTransform(scrollYProgress, [0, 1], ['-14vw', '14vw'])
  const fill = useTransform(scrollYProgress, [.25, .55, .8], [100, 0, 100])
  const clipPath = useMotionTemplate`inset(0 ${fill}% 0 0)`
  return <Reduced><section ref={ref} className="kinetic-divider" style={{ '--divider-accent': accent } as CSSProperties} aria-label={words.join(' · ')}><motion.div className="kinetic-row" style={{ x }}>{words.map((word) => <span key={word}><b>{word}</b><motion.i style={{ clipPath }}>{word}</motion.i></span>)}</motion.div><motion.div className="kinetic-row kinetic-row-reverse" style={{ x: reverse }}>{[...words].reverse().map((word) => <span key={word}><b>{word}</b><i>{word}</i></span>)}</motion.div></section></Reduced>
}

export function RibbonVelocity() {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const boundedVelocity = useTransform(velocity, [-900, 0, 900], [-1, 0, 1])
  const skew = useTransform(boundedVelocity, [-1, 0, 1], [-1.5, 0, 1.5])
  return <Reduced><motion.div className="ribbon-velocity" style={{ '--ribbon-speed': boundedVelocity, skewX: skew } as any} /></Reduced>
}

export function ScrubStage({ className = '', children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, .5, 1], [.96, 1, .96])
  return <div ref={ref} className={`scrub-stage ${className}`}><motion.div className="scrub-stage-sticky" style={{ scale }}>{children}</motion.div></div>
}
