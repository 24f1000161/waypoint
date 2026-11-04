'use client'

import Link from 'next/link'
import { Mark } from './Mark'
import { WhatHappensNext } from './AuthSupport'

const contours = ['M-20 90C100 20 150 170 300 90S520 20 700 120', 'M-30 190C120 100 190 280 350 180S560 90 760 230', 'M-20 310C100 210 210 400 380 290S590 210 760 350', 'M-40 430C120 330 220 500 390 420S590 340 760 500', 'M-20 560C110 460 230 650 420 530S610 480 780 610', 'M-40 700C140 570 270 760 450 650S640 590 780 760', 'M40 -30C170 80 280 -20 390 100S610 120 780 30', 'M210 -30C280 70 420 0 500 130S690 180 800 120', 'M-30 820C150 720 260 900 460 780S650 700 800 830', 'M50 860C240 760 330 920 510 830S670 790 820 870']

type Props = { children: React.ReactNode; steps?: 'student' | 'mentor'; title?: string }

export function AuthShell({ children, steps, title = 'Waypoint' }: Props) {
  return <div className="auth-shell"><a className="auth-skip" href="#content">Skip to main content</a><aside className="auth-brand-panel"><Link className="auth-brand-link" href="/" aria-label="Waypoint home"><Mark/><span>{title}</span></Link><Link className="auth-back-link" href="/">Back to home</Link><svg className="auth-contour" viewBox="0 0 760 900" preserveAspectRatio="none" aria-hidden="true">{contours.map((path) => <path key={path} d={path}/>)}<path className="auth-route" d="M74 740C190 650 240 420 390 420S570 260 684 86" pathLength="100"/><circle cx="74" cy="740" r="5" fill="var(--marigold)"/><circle cx="684" cy="86" r="5" fill="var(--marigold)"/></svg>{steps && <div className="auth-desktop-steps"><WhatHappensNext role={steps}/></div>}<p className="auth-brand-note">Conversations stay on the channels you choose. We never store them.</p></aside><main id="content" className="auth-main"><div className="auth-form-column">{children}{steps && <details className="auth-privacy auth-mobile-steps"><summary>What happens next?</summary><WhatHappensNext role={steps}/></details>}</div></main></div>
}
