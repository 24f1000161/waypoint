'use client'

import { useEffect } from 'react'

export function SiteTypewriter() {
  useEffect(() => {
    const root = document.querySelector('main') || document.body
    const timer = window.setTimeout(() => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      const nodes: Text[] = []
      let current: Node | null
      while ((current = walker.nextNode())) {
        const text = current as Text
        const parent = text.parentElement
        if (!parent || text.data.trim().length < 2 || parent.closest('.fx-text,.brand,.illustrative,.sr-only,svg,[aria-hidden="true"],[data-auto-typed]')) continue
        nodes.push(text)
      }
      nodes.forEach((text) => {
        const value = text.data
        const fragment = document.createDocumentFragment()
        value.split(/(\s+)/).forEach((part) => {
          if (/\s+/.test(part)) fragment.append(part)
          else if (part) {
            const word = document.createElement('span')
            word.className = 'auto-type-word'
            ;[...part].forEach((character, index) => {
              const letter = document.createElement('span')
              letter.className = 'auto-type-char'
              letter.style.setProperty('--auto-index', String(index))
              letter.textContent = character
              word.append(letter)
            })
            fragment.append(word)
          }
        })
        const parent = text.parentElement
        if (parent) parent.dataset.autoTyped = 'true'
        text.replaceWith(fragment)
      })
    }, 120)
    return () => window.clearTimeout(timer)
  }, [])
  return null
}
