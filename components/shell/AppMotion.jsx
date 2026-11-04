'use client'
import { MotionConfig } from 'motion/react'
import { useMotionPreference } from '@/lib/motion/MotionPreferenceProvider'
export function AppMotion({ children }) { const { reduced } = useMotionPreference(); return <MotionConfig reducedMotion={reduced ? 'always' : 'user'}>{children}</MotionConfig> }
