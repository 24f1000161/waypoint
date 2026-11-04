'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type MotionPreferenceContextValue = {
  reduced: boolean
  setManualReduced: (value: boolean) => void
}

const MotionPreferenceContext = createContext<MotionPreferenceContextValue | null>(null)

export function MotionPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(false)
  const [manualReduced, setManualReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setSystemReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const value = useMemo(() => ({ reduced: systemReduced || manualReduced, setManualReduced }), [systemReduced, manualReduced])
  return <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>
}

export function useMotionPreference() {
  const context = useContext(MotionPreferenceContext)
  if (!context) throw new Error('useMotionPreference must be used inside MotionPreferenceProvider')
  return context
}
