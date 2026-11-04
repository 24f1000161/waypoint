'use client'

import { useEffect, useRef } from 'react'
import type { ElementType, ReactNode } from 'react'
import { AnimatedText } from '@/components/text/AnimatedText'

const accentBySection: Record<string, string> = {
  departure: '#B86E0A',
  'the-gap': '#B4492E',
  journey: '#F0A93A',
  atlas: '#2F5D4B',
  'human-loop': '#B86E0A',
  private: '#B4492E',
  mentors: '#F0A93A',
  faq: '#2F5D4B',
  closing: '#F0A93A',
}

export function AccentObserver() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const accent = accentBySection[entry.target.getAttribute('data-section') || '']
        if (accent) document.documentElement.style.setProperty('--live-accent', accent)
        document.documentElement.dataset.accent = entry.target.getAttribute('data-section') || ''
      })
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return null
}

type LiveTextProps = { as?: ElementType; phase?: number; children: ReactNode; className?: string }

export function LiveText({ as: Component = 'em', phase = 0, children, className = '' }: LiveTextProps) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--live-delay', `${phase * -14}s`)
    const update = () => {
      const active = !document.hidden && node.dataset.inView === 'true'
      node.classList.toggle('is-paused', !active)
    }
    const observer = new IntersectionObserver(([entry]) => {
      node.dataset.inView = String(entry.isIntersecting)
      const visible = Array.from(document.querySelectorAll<HTMLElement>('.live-text[data-in-view="true"]'))
      visible.forEach((item, index) => item.classList.toggle('is-paused', index > 1))
      update()
    }, { threshold: 0.1 })
    observer.observe(node)
    document.addEventListener('visibilitychange', update)
    update()
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [phase])
  const RenderComponent = Component as any
  return <RenderComponent ref={ref} className={`live-text ${className}`} data-in-view="false"><AnimatedText variant="TYPE" speed="slow">{typeof children === 'string' ? children : String(children)}</AnimatedText></RenderComponent>
}

export function ColourLens({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || !window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let targetX = 50
    let targetY = 50
    let x = 50
    let y = 50
    const tick = () => {
      x += (targetX - x) * 0.16
      y += (targetY - y) * 0.16
      node.style.setProperty('--mx', `${x}%`)
      node.style.setProperty('--my', `${y}%`)
      frame = requestAnimationFrame(tick)
    }
    const move = (event: PointerEvent) => { const rect = node.getBoundingClientRect(); targetX = ((event.clientX - rect.left) / rect.width) * 100; targetY = ((event.clientY - rect.top) / rect.height) * 100 }
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerenter', () => node.classList.add('lens-visible'))
    node.addEventListener('pointerleave', () => node.classList.remove('lens-visible'))
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); node.removeEventListener('pointermove', move) }
  }, [])
  return <span ref={ref} className={`colour-lens ${className}`}><span className="colour-lens-base">{children}</span><span className="colour-lens-glow" aria-hidden="true">{children}</span></span>
}
