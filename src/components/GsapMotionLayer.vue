<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)
const scope = ref(null)
let context

const splitTextNodes = root => {
  const targets = root.querySelectorAll('h1,h2,h3,h4,p,li,summary,small,strong,.section-label,.eyebrow,.micro')
  targets.forEach(target => {
    if (target.closest('svg,[aria-hidden="true"],.hero-typewriter,.marquee-track,.typewriter-ready')) return
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT)
    const nodes = []
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue?.trim()) nodes.push(walker.currentNode)
    }
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment()
      Array.from(node.nodeValue || '').forEach(character => {
        const span = document.createElement('span')
        span.className = 'typewriter-char'
        span.textContent = character
        fragment.appendChild(span)
      })
      node.parentNode?.replaceChild(fragment, node)
    })
    target.classList.add('typewriter-ready')
  })
}

onMounted(() => {
  const root = scope.value
  if (!root) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced) splitTextNodes(root)
  root.querySelectorAll('h1,h2,h3,h4,p,a,button,li,summary,small,strong,.section-label,.eyebrow,.micro,.brand').forEach(element => element.classList.add('wave-text'))
  context = gsap.context(() => {
    const sections = gsap.utils.toArray('[data-section]')
    sections.forEach(section => section.classList.add('gsap-ready'))
    if (reduced) return

    root.querySelectorAll('.typewriter-ready').forEach(target => {
      const characters = target.querySelectorAll('.typewriter-char')
      gsap.fromTo(characters, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .018, stagger: .018, ease: 'none', scrollTrigger: { trigger: target, start: 'top 92%', once: true } })
    })

    const hero = root.querySelector('.hero')
    if (hero) {
      const title = hero.querySelector('.hero-typewriter')
      const art = hero.querySelector('.hero-art')
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (title) intro.from(title, { y: 28, opacity: 0, duration: .85 }, .15)
      intro.from(hero.querySelectorAll('.hero-copy .eyebrow, .hero-copy .lede, .hero-copy .hero-ctas, .hero-copy .micro'), { y: 24, opacity: 0, duration: .65, stagger: .1 }, .45)
      intro.from(hero.querySelectorAll('.path-line, .path-node, .checkpoint, .checkpoint-dot'), { opacity: 0, scale: .7, strokeDashoffset: 500, duration: 1.1, stagger: .1 }, .35)
      gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 } }).to(title, { x: -18 }).to(art, { y: -32, opacity: .65 }, '<')
    }

    root.querySelectorAll('[data-section] > .section-label, .atlas-heading, .journey-heading, .principles h2, .privacy h2, .mentors h2, .faq h2').forEach(element => {
      gsap.from(element, { y: 34, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } })
    })
    root.querySelectorAll('.manifesto h2').forEach(element => {
      const split = new SplitText(element, { type: 'words', wordsClass: 'manifesto-word' })
      gsap.fromTo(split.words, { opacity: .18, y: 14 }, { opacity: 1, y: 0, stagger: .035, ease: 'none', scrollTrigger: { trigger: element, start: 'top 82%', end: 'bottom 38%', scrub: .6 } })
    })
    root.querySelectorAll('.journey-stage, .journey-rail button, .atlas-panel, .profile-card, .faq-list details, .lock-card').forEach(element => {
      gsap.from(element, { y: 34, opacity: 0, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } })
    })
    root.querySelectorAll('.journey-stage img, .atlas-panel img, .guidance-scene').forEach(visual => {
      gsap.from(visual, { clipPath: 'inset(0 100% 0 0)', scale: 1.045, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: visual, start: 'top 82%', once: true } })
    })
    root.querySelectorAll('.hero-art, .mentor-stack').forEach(visual => {
      gsap.to(visual, { y: -26, ease: 'none', scrollTrigger: { trigger: visual.closest('[data-section]') || visual, start: 'top bottom', end: 'bottom top', scrub: .8 } })
    })
    root.querySelectorAll('.closing h2, .closing .btn').forEach(element => gsap.from(element, { y: 38, opacity: 0, stagger: .12, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element.closest('.closing'), start: 'top 82%', once: true } }))
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, root)
})

onBeforeUnmount(() => { context?.revert(); ScrollTrigger.getAll().forEach(trigger => trigger.kill()) })
</script>
<template><div ref="scope" class="gsap-motion-layer"><slot /></div></template>
