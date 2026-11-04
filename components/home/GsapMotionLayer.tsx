'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, registerGsapPlugins, ScrollTrigger, SplitText } from '@/lib/motion/gsap'
import { useMotionPreference } from '@/lib/motion/MotionPreferenceProvider'

registerGsapPlugins()

type Props = { children: React.ReactNode }

export function GsapMotionLayer({ children }: Props) {
  const scope = useRef<HTMLDivElement>(null)
  const { reduced } = useMotionPreference()

  useGSAP(() => {
    if (!scope.current) return
    const root = scope.current
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-gsap-section]')
      sections.forEach((section) => section.classList.add('gsap-ready'))

      if (reduced) {
        gsap.set('[data-gsap-reveal]', { clearProps: 'all' })
        return
      }

      const intro = document.querySelector<HTMLElement>('[data-gsap-intro]')
      if (intro) {
        const title = intro.querySelector('h1')
        const split = title ? new SplitText(title, { type: 'lines', mask: 'lines', autoSplit: true }) : null
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        if (split) tl.from(split.lines, { yPercent: 105, opacity: 0, duration: 0.9, stagger: 0.12 }, 0)
        tl.from(intro.querySelectorAll('[data-gsap-reveal]'), { y: 24, opacity: 0, duration: 0.65, stagger: 0.1 }, 0.55)
          .from(intro.querySelectorAll('.path-line, .path-node, .checkpoint'), { opacity: 0, scale: 0.7, strokeDashoffset: 500, duration: 1.1, stagger: 0.1 }, 0.35)
        ScrollTrigger.create({ trigger: intro, start: 'top top', end: 'bottom top', scrub: 0.6, animation: gsap.timeline().to(intro.querySelector('h1'), { x: -18, opacity: 0.35 }).to(intro.querySelector('.hero-art'), { y: -32, opacity: 0.65 }, '<') })
        gsap.set(intro.querySelectorAll('[data-gsap-reveal]'), { willChange: 'transform, opacity' })
      }

      gsap.utils.toArray<HTMLElement>('[data-gsap-reveal]').forEach((element) => {
        gsap.from(element, { y: 34, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } })
      })

      gsap.utils.toArray<HTMLElement>('[data-gsap-manifesto]').forEach((element) => {
        const split = new SplitText(element, { type: 'words', wordsClass: 'manifesto-word' })
        gsap.fromTo(split.words, { opacity: 0.18, y: 14 }, { opacity: 1, y: 0, stagger: 0.035, ease: 'none', scrollTrigger: { trigger: element, start: 'top 82%', end: 'bottom 38%', scrub: 0.6 } })
      })

      gsap.utils.toArray<HTMLElement>('[data-gsap-journey]').forEach((wrapper) => {
        const steps = wrapper.querySelectorAll('.journey-step')
        gsap.from(steps, { y: 28, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: wrapper, start: 'top 78%', once: true } })
        gsap.to(wrapper.querySelector('.progress-line span'), { width: '100%', ease: 'none', scrollTrigger: { trigger: wrapper, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 } })
      })

      const decision = document.querySelector<HTMLElement>('[data-gsap-decision]')
      if (decision) {
        gsap.from(decision.querySelectorAll('.token-row .silhouette'), { x: -46, y: 24, opacity: 0, stagger: 0.14, duration: 1.1, ease: 'back.out(1.4)', scrollTrigger: { trigger: decision, start: 'top 78%', once: true } })
        gsap.from(decision.querySelector('.flow-ring'), { scale: 0.6, rotation: -90, opacity: 0, duration: 1, ease: 'back.out(1.6)', scrollTrigger: { trigger: decision, start: 'top 70%', once: true } })
      }

      gsap.utils.toArray<HTMLElement>('[data-gsap-closing]').forEach((element) => {
        gsap.from(element.querySelectorAll('h2, .btn'), { y: 38, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 82%', once: true } })
      })

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    }, root)

    return () => ctx.revert()
  }, { scope, dependencies: [reduced] })

  return <div ref={scope} className={reduced ? 'motion-reduced' : undefined}>{children}</div>
}
