'use client'
import Link from 'next/link'
import { Check, ChevronRight, Circle, Info, LockKeyhole, MoreHorizontal } from 'lucide-react'
import { getStatus } from '@/lib/demo/status'
export function SampleTag(){return <span className="sample-tag">Sample data</span>}
export function StatusBadge({status,scope}){const meta=getStatus(status);const Icon=meta.icon;return <span className={`status-badge status-${meta.tone}`} data-scope={scope}><Icon size={14} aria-hidden="true"/>{meta.label}</span>}
export function Avatar({initials,label}){return <span className="avatar" aria-label={label}>{initials}</span>}
export function SectionCard({id,title,description,actions,children,className=''}){return <section id={id} className={`section-card ${className}`}><div className="card-header">{title&&<div><h2>{title}</h2>{description&&<p>{description}</p>}</div>}{actions&&<div className="card-actions">{actions}</div>}</div>{children}</section>}
export function PageHeader({eyebrow,title,description,children}){return <div className="page-header"><div><p className="dashboard-eyebrow">{eyebrow}</p><h1>{title}</h1>{description&&<p className="page-lede">{description}</p>}</div>{children}</div>}
export function SectionHeading({eyebrow,title,children}){return <div className="section-heading">{eyebrow&&<p className="dashboard-eyebrow">{eyebrow}</p>}<h2>{title}</h2>{children}</div>}
export function MetricCard({label,value,note,href}){const content=<><span className="metric-label">{label}</span><strong className="metric-value">{value}</strong>{note&&<small>{note}</small>}</>;return href?<Link className="metric-card" href={href}>{content}<ChevronRight size={16}/></Link>:<div className="metric-card">{content}</div>}
export function EmptyState({icon:Icon=Circle,title,children,action}){return <div className="empty-state"><Icon size={24}/><h3>{title}</h3><p>{children}</p>{action}</div>}
export function ProgressTimeline({stages}){return <ol className="progress-timeline">{stages.map((stage,index)=><li key={stage.id} className={`timeline-${stage.state}`} aria-current={stage.state==='current'?'step':undefined}><span className="timeline-marker">{stage.state==='done'?<Check size={14}/>:index+1}</span><div><strong>{stage.label}</strong>{stage.detail&&<small>{stage.detail}</small>}</div></li>)}</ol>}
export function ChannelChip({children}){return <span className="channel-chip">{children}</span>}
export function CapacityMeter({free,total=3}){return <div className="capacity"><span>{free} of {total} slots free</span><meter min="0" max={total} value={free} aria-label={`${free} of ${total} slots free`}/></div>}
export function DemoBar({children,onReset}){return <div className="demo-bar"><span>Demo mode · Sample data · Nothing here is saved or sent.</span>{children}<button type="button" onClick={onReset}>Reset demo</button></div>}
export function DetailHint(){return <span className="detail-hint"><Info size={14}/>Sample data</span>}
