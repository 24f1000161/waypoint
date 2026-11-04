'use client'
import { useMotionPreference } from '@/lib/motion/MotionPreferenceProvider'
export function ReduceMotionToggle() { const { reduced, setManualReduced } = useMotionPreference(); return <button className="motion-toggle" type="button" aria-pressed={reduced} onClick={() => setManualReduced(!reduced)}>{reduced ? 'Enable motion' : 'Reduce motion'}</button> }
