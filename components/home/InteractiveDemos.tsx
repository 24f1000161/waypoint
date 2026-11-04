'use client'

import { useEffect, useReducer, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, LockKeyhole, RotateCcw, X } from 'lucide-react'
import { guidanceAreas } from '@/lib/content'
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

function IllustrativeTag() { return <span className="illustrative">Illustrative · sample data</span> }
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
    <div className="scene-title"><IllustrativeTag/><span>{area}</span></div>
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
  return <LayoutGroup id="guidance-explorer"><div className="explorer-grid" aria-label="Interactive guidance area explorer">{guidanceAreas.map((item, index) => <motion.button layoutId={`area-${index}`} key={item.name} className={`explorer-card ${focused === index ? 'focused' : ''}`} onClick={() => setSelected(index)} onFocus={() => setFocused(index)} whileTap={{ scale: .985 }}><span className="outline-num">0{index + 1}</span><span className="explorer-card-copy"><strong>{item.name}</strong><small>Explore example concerns</small></span></motion.button>)}</div><AnimatePresence>{area && selected !== null && <motion.div className="explorer-overlay" role="dialog" aria-modal="true" aria-labelledby="explorer-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div layoutId={`area-${selected}`} className="explorer-modal"><div className="explorer-modal-head"><div><IllustrativeTag/><h3 id="explorer-title">{area.name}</h3></div><button ref={closeRef} className="icon-button" onClick={() => setSelected(null)} aria-label="Close guidance explorer"><X size={20}/></button></div><GuidanceSceneInteractive area={area.name} index={selected}/><div className="explorer-details"><div><span className="detail-label">Example concerns</span>{['I want to understand my options.', 'I am not sure what to ask next.', 'Could someone help me compare paths?'].map((line) => <p key={line}>“{line}” <small>Example</small></p>)}</div><div><span className="detail-label">What a mentor here could help with</span><p>{area.description}</p><div className="chip-row"><span className="reason-chip">Professional</span><span className="reason-chip">Higher studies</span></div></div></div><div className="explorer-actions"><button className="text-button" onClick={() => setSelected((selected + guidanceAreas.length - 1) % guidanceAreas.length)}><ArrowLeft size={16}/> Previous</button><a className="btn btn-accent" href={`${links.studentStart}?area=${encodeURIComponent(area.name)}`}>Request a mentor <ArrowRight size={16}/></a><button className="text-button" onClick={() => setSelected((selected + 1) % guidanceAreas.length)}>Next <ArrowRight size={16}/></button></div></motion.div></motion.div>}</AnimatePresence></LayoutGroup>
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
  return <div className="matching-demo"><div className="demo-heading"><div><IllustrativeTag/><h3>Try it: build a request, watch suggestions form.</h3></div><button className="text-button" onClick={() => dispatch({ type: 'reset' })}><RotateCcw size={15}/> Reset demo</button></div><div className="matching-grid"><div className="request-composer"><span className="detail-label">Request composer</span><p>Which areas would you like to explore?</p><div className="choice-list">{guidanceAreas.map((area) => <button className={state.areas.includes(area.name) ? 'selected' : ''} key={area.name} onClick={() => dispatch({ type: 'area', area: area.name })} aria-pressed={state.areas.includes(area.name)}>{area.name}<span>{state.areas.includes(area.name) ? <Check size={15}/> : '+'}</span></button>)}</div><label className="toggle-line"><span><b>Sample Mentor B</b> is unavailable</span><input type="checkbox" checked={state.mentorBUnavailable} onChange={() => dispatch({ type: 'unavailable' })}/></label></div><div className="suggestion-list"><div className="suggestion-list-head"><span className="detail-label">Suggestions</span><span className="illustrative">Illustrative · sample data</span></div><AnimatePresence mode="popLayout">{ranked.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} selectedAreas={state.areas} unavailable={state.mentorBUnavailable}/>)}</AnimatePresence>{state.mentorBUnavailable && <div className="unavailable-divider">Unavailable, not suggested</div>}</div></div><div className="demo-stepper"><span className={state.approved ? '' : 'active'}>1 Suggestions</span><i>›</i><span className={state.approved ? 'active' : ''}>2 IIC team approves</span><i>›</i><span className={state.accepted ? 'active' : ''}>3 Mentor accepts</span></div><div className="demo-actions"><button className="btn btn-accent" disabled={state.approved || !state.areas.length} onClick={() => dispatch({ type: 'approve' })}>{state.approved ? 'Approved by IIC team' : 'Approve as the IIC team'}</button><button className="btn btn-outline" disabled={!state.approved || state.accepted} onClick={() => dispatch({ type: 'accept' })}>{state.accepted ? 'Mentor accepted' : 'Mentor accepts'}</button>{state.accepted && <div className="contact-unlocked"><LockKeyhole size={17}/><span>Preferred first contact: shared after acceptance</span></div>}</div><p className="sr-only" aria-live="polite">{live}</p></div>
}

export function RoleTimeline() { const [role, setRole] = useState<'Student' | 'Mentor' | 'IIC team'>('Student'); const lanes = ['Student', 'Mentor', 'IIC team'] as const; const laneCopy = { Student: ['You submit the context', 'The IIC team reviews', 'A mentor conversation begins'], Mentor: ['You set your terms', 'You accept or decline', 'You choose the channel'], 'IIC team': ['Review the request', 'Approve or revise', 'Record the checkpoint'] } as const; const laneSteps = laneCopy[role]; return <div className="role-demo"><div className="demo-heading"><div><IllustrativeTag/><h3>Follow your role</h3><p>One shared path, three clear responsibilities.</p></div><div className="role-tabs" role="tablist" aria-label="Choose a role">{lanes.map((item) => <motion.button layout className={role === item ? 'active' : ''} key={item} onClick={() => setRole(item)} role="tab" aria-selected={role === item}>{item}</motion.button>)}</div></div><div className="role-flow"><div className="role-flow-line"/><AnimatePresence mode="popLayout" initial={false}>{laneSteps.map((event, index) => <motion.button layout key={`${role}-${event}`} className="role-flow-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: index * .07, duration: .28 }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{event}</strong><small>{role === 'Student' ? 'Your next handoff' : role === 'Mentor' ? 'Your decision' : 'Recorded checkpoint'}</small></motion.button>)}</AnimatePresence></div><div className="role-note"><span className="availability-dot"/><p><strong>{role}</strong> sees only the next useful handoff, while the full relationship remains human-reviewed.</p></div></div> }

export function MentorControls({ available, setAvailable, capacity, setCapacity }: { available: boolean; setAvailable: (value: boolean) => void; capacity: number; setCapacity: (value: number) => void }) { const [expertise, setExpertise] = useState(['Career exploration']); const options = ['Career exploration', 'Interview preparation', 'Skill development']; return <div className="mentor-controls-demo"><div className="control-row"><span>Availability</span><button className={`switch ${available ? 'on' : ''}`} onClick={() => setAvailable(!available)} aria-pressed={available}><i/></button></div><div className="control-row"><span>Capacity</span><div className="stepper"><button onClick={() => setCapacity(Math.max(0, capacity - 1))} aria-label="Decrease capacity">−</button><strong>{capacity}</strong><button onClick={() => setCapacity(Math.min(3, capacity + 1))} aria-label="Increase capacity">+</button></div></div><div className="control-chip-list"><span>Expertise</span>{options.map((item) => <button key={item} className={expertise.includes(item) ? 'selected' : ''} onClick={() => setExpertise((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}>{item}</button>)}</div><p className="control-status"><span className={`availability-dot ${available ? '' : 'off'}`}/>{available ? 'Available for new proposals' : 'Paused for new proposals'} · {capacity} capacity slots</p></div> }
