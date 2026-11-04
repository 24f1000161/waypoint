'use client'

import { useEffect, useReducer, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, LockKeyhole, RotateCcw, X } from 'lucide-react'
import { guidanceAreas, roleFlows, type RoleKey } from '@/lib/content'
import { RollingWord, TypeText } from '@/components/text/TextAnimations'
import { links } from '@/lib/links'

const sampleMentors = [
  { id: 'a', label: 'Mentor A', background: 'Professional', expertise: ['Career exploration', 'Interview preparation'], available: true, capacity: 2 },
  { id: 'b', label: 'Mentor B', background: 'Higher studies', expertise: ['Higher studies', 'Skill development'], available: true, capacity: 1 },
  { id: 'c', label: 'Mentor C', background: 'Professional', expertise: ['Employment and job search', 'Interview preparation'], available: true, capacity: 2 },
  { id: 'd', label: 'Mentor D', background: 'Higher studies', expertise: ['Career exploration', 'Skill development'], available: true, capacity: 0 },
]

type SimState = { areas: string[]; mentorBUnavailable: boolean; approved: boolean; accepted: boolean }
type SimAction = { type: 'area'; area: string } | { type: 'unavailable' } | { type: 'approve' } | { type: 'accept' } | { type: 'reset' }
function simReducer(state: SimState, action: SimAction): SimState {
  if (action.type === 'reset') return { areas: [], mentorBUnavailable: false, approved: false, accepted: false }
  if (action.type === 'area') return { ...state, areas: state.areas.includes(action.area) ? state.areas.filter((item) => item !== action.area) : state.areas.length < 2 ? [...state.areas, action.area] : state.areas }
  if (action.type === 'unavailable') return { ...state, mentorBUnavailable: !state.mentorBUnavailable }
  if (action.type === 'approve') return { ...state, approved: true }
  return { ...state, accepted: true }
}

function IllustrativeTag() { return <span className="illustrative"><TypeText text="Illustrative · sample data" active speed="fast"/></span> }
function DemoAvatar({ label }: { label: string }) { return <span className="demo-avatar" aria-label={`${label} abstract avatar`}><i/><b/></span> }

export function HeroFragmentLinks() {
  const fragments = [
    ['request-fragment', 'Request', '#how-it-works', 'Your request starts the review path.'],
    ['mentor-fragment', 'Suggestion', '#guidance-areas', 'Suggestions use expertise, availability, and capacity.'],
    ['stamp', 'Stamp', '#human-loop', 'The IIC team reviews every match.'],
    ['lock-note', 'Lock', '#privacy', 'Contact unlocks after acceptance.'],
  ] as const
  const [active, setActive] = useState('')
  return <div className="hero-fragment-captions" aria-live="polite">{fragments.map(([className, label, href, caption]) => <a key={className} className={`fragment-link ${className} ${active === className ? 'is-hot' : ''}`} href={href} onFocus={() => setActive(className)} onBlur={() => setActive('')} onMouseEnter={() => setActive(className)} onMouseLeave={() => setActive('')}><span>{label}</span>{active === className && <small>{caption}</small>}</a>)}</div>
}

function GuidanceSceneInteractive({ area, index }: { area: string; index: number }) {
  const [hot, setHot] = useState('')
  const labels = index === 0 ? ['Industry roles', 'Higher studies', 'Not sure yet', 'Skill building'] : index === 1 ? ['Exploring options', 'Applying', 'Deciding'] : index === 2 ? ['Question', 'Answer'] : index === 3 ? ['Technical', 'Communication', 'Domain knowledge'] : ['Find roles', 'Open doorway']
  return <div className={`interactive-scene scene-${index}`} onPointerMove={(event) => { if (event.pointerType !== 'touch') { const rect = event.currentTarget.getBoundingClientRect(); const column = Math.max(0, Math.min(labels.length - 1, Math.floor(((event.clientX - rect.left) / rect.width) * labels.length))); setHot(labels[column]) } }} onPointerLeave={() => setHot('')}>
    <div className="scene-title"><IllustrativeTag/><TypeText text={area} active speed="fast"/></div>
    <div className="scene-art" aria-label={`${area} interactive illustration`}>
      {labels.map((label, i) => <button key={label} className={`scene-hotspot hotspot-${i} ${hot === label ? 'hot' : ''}`} onFocus={() => setHot(label)} onBlur={() => setHot('')} onMouseEnter={() => setHot(label)} onMouseLeave={() => setHot('')} aria-label={`${label} example hotspot`}><i/>{hot === label && <span>{label}</span>}</button>)}
      <div className="scene-grid"/><div className="scene-needle"/><div className="scene-flag">⚑</div>
    </div>
  </div>
}

export function GuidanceExplorer() {
  const [selected, setSelected] = useState<number | null>(null)
  const [focused, setFocused] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { if (selected === null) return; closeRef.current?.focus(); const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [selected])
  const area = selected === null ? null : guidanceAreas[selected]
  return <LayoutGroup id="guidance-explorer"><div className="explorer-grid" aria-label="Interactive guidance area explorer">{guidanceAreas.map((item, index) => <motion.button layoutId={`area-${index}`} key={item.name} className={`explorer-card ${focused === index ? 'focused' : ''}`} onClick={() => setSelected(index)} onFocus={() => setFocused(index)} whileTap={{ scale: .985 }}><span className="outline-num">0{index + 1}</span><span className="explorer-card-copy"><strong><TypeText text={item.name} active speed="fast"/></strong><small><TypeText text="Explore example concerns" active speed="fast"/></small></span></motion.button>)}</div><AnimatePresence>{area && selected !== null && <motion.div className="explorer-overlay" role="dialog" aria-modal="true" aria-labelledby="explorer-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div layoutId={`area-${selected}`} className="explorer-modal"><div className="explorer-modal-head"><div><IllustrativeTag/><h3 id="explorer-title"><TypeText text={area.name} active speed="slow"/></h3></div><button ref={closeRef} className="icon-button" onClick={() => setSelected(null)} aria-label="Close guidance explorer"><X size={20}/></button></div><GuidanceSceneInteractive area={area.name} index={selected}/><div className="explorer-details"><div><span className="detail-label"><TypeText text="Example concerns" active speed="fast"/></span>{['I want to understand my options.', 'I am not sure what to ask next.', 'Could someone help me compare paths?'].map((line) => <p key={line}>“<TypeText text={line} active speed={14}/>” <small><TypeText text="Example" active speed="fast"/></small></p>)}</div><div><span className="detail-label">What a mentor here could help with</span><p>{area.description}</p><div className="chip-row"><span className="reason-chip">Professional</span><span className="reason-chip">Higher studies</span></div></div></div><div className="explorer-actions"><button className="text-button" onClick={() => setSelected((selected + guidanceAreas.length - 1) % guidanceAreas.length)}><ArrowLeft size={16}/> Previous</button><a className="btn btn-accent" href={`${links.studentStart}?area=${encodeURIComponent(area.name)}`}>Request a mentor <ArrowRight size={16}/></a><button className="text-button" onClick={() => setSelected((selected + 1) % guidanceAreas.length)}>Next <ArrowRight size={16}/></button></div></motion.div></motion.div>}</AnimatePresence></LayoutGroup>
}

function MentorCard({ mentor, selectedAreas, unavailable }: { mentor: typeof sampleMentors[number]; selectedAreas: string[]; unavailable: boolean }) {
  const hidden = mentor.id === 'b' && unavailable
  const matches = selectedAreas.filter((area) => mentor.expertise.includes(area))
  return <motion.article layout className={`sim-mentor ${hidden ? 'unavailable-card' : ''}`} transition={{ layout: { type: 'spring', stiffness: 400, damping: 30 } }}><div className="sim-mentor-head"><DemoAvatar label={mentor.label}/><div><strong>{mentor.label}</strong><small>{mentor.background}</small></div><span className={`availability-dot ${mentor.available && !hidden ? '' : 'off'}`} aria-label={mentor.available && !hidden ? 'Available' : 'Unavailable'}/></div><div className="chip-row">{mentor.expertise.map((item) => <span className={`reason-chip ${matches.includes(item) ? 'match' : ''}`} key={item}>{item}</span>)}</div><div className="sim-mentor-foot"><span>{matches.length ? `Matched on ${matches[0]}` : 'Relevant background'}</span><span><i className="capacity-pips">{[0,1,2].map((i) => <b className={i < mentor.capacity ? 'filled' : ''} key={i}/>)}</i> {mentor.capacity} slot{mentor.capacity === 1 ? '' : 's'} open</span></div></motion.article>
}

export function MatchingSimulator() {
  const [state, dispatch] = useReducer(simReducer, { areas: [], mentorBUnavailable: false, approved: false, accepted: false })
  const live = state.accepted ? 'Mentor accepted. Contact is now unlocked.' : state.approved ? 'The IIC team approved the top suggestion.' : state.areas.length ? 'Suggestions re-ranked by the selected guidance areas.' : 'Choose one or two areas to build a sample request.'
  const ranked = [...sampleMentors].sort((a, b) => (state.areas.filter((area) => b.expertise.includes(area)).length - state.areas.filter((area) => a.expertise.includes(area)).length))
  return <div className="matching-demo"><div className="demo-heading"><div><IllustrativeTag/><h3><TypeText text="Try it: build a request, watch suggestions form." active speed="slow"/></h3></div><button className="text-button" onClick={() => dispatch({ type: 'reset' })}><RotateCcw size={15}/> Reset demo</button></div><div className="matching-grid"><div className="request-composer"><span className="detail-label"><TypeText text="Request composer" active speed="fast"/></span><p><TypeText text="Which areas would you like to explore?" active speed="fast"/></p><div className="choice-list">{guidanceAreas.map((area) => <button className={state.areas.includes(area.name) ? 'selected' : ''} key={area.name} onClick={() => dispatch({ type: 'area', area: area.name })} aria-pressed={state.areas.includes(area.name)}>{area.name}<span>{state.areas.includes(area.name) ? <Check size={15}/> : '+'}</span></button>)}</div><label className="toggle-line"><span><b>Sample Mentor B</b> is unavailable</span><input type="checkbox" checked={state.mentorBUnavailable} onChange={() => dispatch({ type: 'unavailable' })}/></label></div><div className="suggestion-list"><div className="suggestion-list-head"><span className="detail-label"><TypeText text="Suggestions" active speed="fast"/></span><IllustrativeTag/></div><AnimatePresence mode="popLayout">{ranked.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} selectedAreas={state.areas} unavailable={state.mentorBUnavailable}/>)}</AnimatePresence>{state.mentorBUnavailable && <div className="unavailable-divider"><TypeText text="Unavailable, not suggested" active speed="fast"/></div>}</div></div><div className="demo-stepper"><span className={state.approved ? '' : 'active'}><TypeText text="1 Suggestions" active speed="fast"/></span><i>›</i><span className={state.approved ? 'active' : ''}><TypeText text="2 IIC team approves" active speed="fast"/></span><i>›</i><span className={state.accepted ? 'active' : ''}><TypeText text="3 Mentor accepts" active speed="fast"/></span></div><div className="demo-actions"><button className="btn btn-accent" disabled={state.approved || !state.areas.length} onClick={() => dispatch({ type: 'approve' })}>{state.approved ? 'Approved by IIC team' : 'Approve as the IIC team'}</button><button className="btn btn-outline" disabled={!state.approved || state.accepted} onClick={() => dispatch({ type: 'accept' })}>{state.accepted ? 'Mentor accepted' : 'Mentor accepts'}</button>{state.accepted && <div className="contact-unlocked"><LockKeyhole size={17}/><span>Preferred first contact: shared after acceptance</span></div>}</div><p className="sr-only" aria-live="polite">{live}</p></div>
}

export function RoleTimeline() {
  const roles: RoleKey[] = ['Student', 'Mentor', 'IIC team']
  const [role, setRole] = useState<RoleKey>('Student')
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const [manualPause, setManualPause] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const flow = roleFlows[role]
  const current = flow.steps[step]
  const shouldPause = paused || manualPause || hovered || focused
  useEffect(() => { if (shouldPause || typeof document === 'undefined') return; const timer = window.setInterval(() => setStep((currentStep) => { if (currentStep < 4) return currentStep + 1; setRole((currentRole) => roles[(roles.indexOf(currentRole) + 1) % roles.length]); return 0 }), 4000); return () => window.clearInterval(timer) }, [shouldPause])
  useEffect(() => { const onVisibility = () => setPaused(document.hidden); document.addEventListener('visibilitychange', onVisibility); return () => document.removeEventListener('visibilitychange', onVisibility) }, [])
  const selectRole = (next: RoleKey) => { setRole(next); setStep(0) }
  const selectStep = (next: number) => setStep(Math.max(0, Math.min(4, next)))
  const handoff = current.handoff
  return <div className={`role-demo role-${role.toLowerCase().replace(' ', '-').replace('team', 'team')}`} style={{ '--role-accent': flow.accent } as CSSProperties} onPointerEnter={() => setHovered(true)} onPointerDown={() => setHovered(true)} onPointerLeave={() => window.setTimeout(() => setHovered(false), 1500)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
    <div className="demo-heading role-heading"><div><IllustrativeTag/><h3><TypeText text="Follow your role" active speed="fast"/></h3><p><TypeText text="One shared path, three clear responsibilities." active speed={16}/></p><div className="now-following"><TypeText text="Now following:" active speed="fast"/> <RollingWord value={role} items={roles}/></div></div><div className="role-tabs" role="tablist" aria-label="Choose a role">{roles.map((item) => <button className={role === item ? 'active' : ''} key={item} onClick={() => selectRole(item)} role="tab" aria-selected={role === item} aria-controls="role-carousel"><span>{item}</span>{role === item && <motion.i layoutId="role-tab-indicator"/>}</button>)}</div></div>
    <div className="role-rail" aria-hidden="true"><svg viewBox="0 0 1000 48" preserveAspectRatio="none"><path d="M30 24H970"/><motion.path d={`M30 24H${30 + (step / 4) * 940}`} initial={false} animate={{ pathLength: 1 }} transition={{ type: 'spring', stiffness: 140, damping: 22 }}/>{[0,1,2,3,4].map((index) => <motion.circle key={index} cx={30 + index * 235} cy="24" r={index === step ? 9 : 6} animate={{ fill: index <= step ? 'var(--role-accent)' : 'rgba(245,240,230,.24)', scale: index === step ? 1.15 : 1 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}/>)}</svg></div>
    <div id="role-carousel" className="role-carousel" role="tabpanel" aria-roledescription="carousel" aria-label={`${role} role steps`} onKeyDown={(event) => { if (event.key === 'ArrowRight') selectStep(step + 1); if (event.key === 'ArrowLeft') selectStep(step - 1) }}><AnimatePresence mode="popLayout" initial={false}><motion.article key={`${role}-${step}`} className="role-film-card" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.1} onDragEnd={(_, info) => { if (info.offset.x < -45) selectStep(step + 1); if (info.offset.x > 45) selectStep(step - 1) }} initial={{ opacity: 0, x: 56 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -56 }} transition={{ type: 'spring', stiffness: 140, damping: 22 }} role="group" aria-roledescription="slide" aria-label={`${step + 1} of 5`} tabIndex={0}><span className="role-film-number">0{step + 1}</span><div className="role-film-copy"><span className="role-step-label"><TypeText text={`${role} / 0${step + 1}`} active speed="fast"/></span><h4><TypeText key={`${role}-${step}-title`} text={current.title} active={!shouldPause} speed="slow"/></h4><p><TypeText key={`${role}-${step}`} text={current.body} active={!shouldPause} speed={14}/></p><div className="role-vignette"><span className="illustrative">Illustrative · sample data</span><strong>{current.vignette}</strong><i className={`vignette-art art-${step}`}/></div>{handoff && <button className="handoff-link" onClick={() => { selectRole(handoff.role); setStep(handoff.step) }}>{handoff.label} <ArrowRight size={14}/></button>}</div></motion.article></AnimatePresence></div>
    <div className="role-footer"><p aria-live={shouldPause ? 'polite' : 'off'}><TypeText key={role} text={flow.caption} active={!shouldPause} speed={10}/></p><div className="role-controls"><button onClick={() => selectStep(step - 1)} aria-label="Previous role step"><ArrowLeft size={16}/></button><button onClick={() => selectStep(step + 1)} aria-label="Next role step"><ArrowRight size={16}/></button><button className="pause-button" onClick={() => setManualPause((value) => !value)} aria-pressed={manualPause}>{manualPause ? 'Play' : 'Pause'}</button></div><div className="role-dots" aria-label={`Step ${step + 1} of 5`}>{[0,1,2,3,4].map((index) => <button key={index} className={index === step ? 'active' : ''} onClick={() => selectStep(index)} aria-label={`Go to step ${index + 1}`}/>)}</div></div>
  </div>
}

export function MentorControls({ available, setAvailable, capacity, setCapacity }: { available: boolean; setAvailable: (value: boolean) => void; capacity: number; setCapacity: (value: number) => void }) { const [expertise, setExpertise] = useState(['Career exploration']); const options = ['Career exploration', 'Interview preparation', 'Skill development']; return <div className="mentor-controls-demo"><div className="control-row"><span><TypeText text="Availability" active speed="fast"/></span><button className={`switch ${available ? 'on' : ''}`} onClick={() => setAvailable(!available)} aria-pressed={available}><i/></button></div><div className="control-row"><span><TypeText text="Capacity" active speed="fast"/></span><div className="stepper"><button onClick={() => setCapacity(Math.max(0, capacity - 1))} aria-label="Decrease capacity">−</button><strong>{capacity}</strong><button onClick={() => setCapacity(Math.min(3, capacity + 1))} aria-label="Increase capacity">+</button></div></div><div className="control-chip-list"><span><TypeText text="Expertise" active speed="fast"/></span>{options.map((item) => <button key={item} className={expertise.includes(item) ? 'selected' : ''} onClick={() => setExpertise((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}>{item}</button>)}</div><p className="control-status"><span className={`availability-dot ${available ? '' : 'off'}`}/><TypeText text={available ? 'Available for new proposals' : 'Paused for new proposals'} active speed="fast"/> · <TypeText text={`${capacity} capacity slots`} active speed="fast"/></p></div> }
