'use client'

import { AnimatedText } from '@/components/text/AnimatedText'

export const manifestoSource = 'Most students nearing graduation know they want a next step. Fewer know what to ask for, or who to ask. Informal networks are uneven. Waypoint gives eligible students a structured way to say what they need, and a person who reviews who might help.'
export function ManifestoText() {
  return <AnimatedText as="p" className="manifesto-stable" variant="TYPE" speed={14}>{manifestoSource}</AnimatedText>
}
