'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type MotionPreferenceContextValue = {
  reduced: boolean
  setManualReduced: (value: boolean) => void
}

const MotionPreferenceContext = createContext<MotionPreferenceContextValue | null>(null)

export function MotionPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(false)
  const [manualReduced, setManualReducedState] = useState(false)

  const setManualReduced = (value: boolean) => {
    setManualReducedState(value)
    try { window.localStorage.setItem('waypoint:reduce-motion', value ? '1' : '0') } catch {}
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setSystemReduced(media.matches)
    update()
    try { setManualReducedState(window.localStorage.getItem('waypoint:reduce-motion') === '1') } catch {}
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const reduced = systemReduced || manualReduced
  useEffect(() => { document.documentElement.dataset.motion = reduced ? 'reduced' : 'full' }, [reduced])
  const value = useMemo(() => ({ reduced, setManualReduced }), [reduced])
  return <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>
}

export function useMotionPreference() {
  const context = useContext(MotionPreferenceContext)
  if (!context) throw new Error('useMotionPreference must be used inside MotionPreferenceProvider')
  return context
}
