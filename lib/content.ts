export const PLATFORM_NAME = 'Waypoint'
export const guidanceAreas = [
  { name: 'Career exploration', description: 'Make sense of possible paths and choose a direction that fits your strengths.' },
  { name: 'Higher studies', description: 'Think through programmes, applications, research, and the next academic step.' },
  { name: 'Interview preparation', description: 'Practise the thinking and storytelling that helps you show up prepared.' },
  { name: 'Skill development', description: 'Identify the skills worth building for the path you want to take.' },
  { name: 'Employment and job search', description: 'Get perspective on roles, applications, and starting well in your first job.' },
]
export const steps = [
  ['01', 'Build your profile', 'Share your academic background and career interests so the platform has useful context.'],
  ['02', 'Describe what you need', "Tell us your goal, current concern, and the guidance area you want to explore."],
  ['03', 'See suggested mentors', 'Suggestions use expertise, availability, and capacity; they are not assignments.'],
  ['04', 'IIC team decides', 'The IIC team reviews every match and can approve, revise, decline, or choose manually with a recorded justification.'],
  ['05', 'Mentor accepts', 'The mentor accepts or declines, and contact details unlock only after an approved match is accepted.'],
  ['06', 'Talk on your terms', 'Meet on email, WhatsApp, Google Meet, or another channel, then record only that an interaction occurred and share structured feedback.'],
] as const
export type RoleKey = 'Student' | 'Mentor' | 'IIC team'
export type RoleStep = { title: string; body: string; vignette: string; handoff?: { label: string; role: RoleKey; step: number } }
export type RoleFlow = { accent: string; caption: string; steps: RoleStep[] }
export const roleFlows: Record<RoleKey, RoleFlow> = {
  Student: { accent: 'var(--marigold)', caption: 'You always see where your request stands. Contact details appear only after a match is approved and accepted.', steps: [
    { title: 'Create your profile.', body: 'Share your academic background and career interests. Required fields are completed before you can request a mentor.', vignette: 'Profile fields fill in one by one.' },
    { title: 'Submit your request.', body: 'Describe your goal and current concern, and choose one or more guidance areas.', vignette: 'Guidance chips toggle on.', handoff: { label: 'Goes to the IIC team', role: 'IIC team', step: 0 } },
    { title: 'Track your status.', body: 'See whether your request is awaiting review, approved, declined or closed. You can edit it until a match is approved.', vignette: 'Submitted → In review → Decided.' },
    { title: 'Your match is decided.', body: 'The IIC team approves a match and the mentor accepts. You see the outcome.', vignette: 'Approval stamp, then a check appears.' },
    { title: 'Connect and reflect.', body: "After approval and acceptance you receive the mentor's preferred first-contact method. Log that a conversation happened (never its content) and share feedback once.", vignette: 'Contact unlocks, then feedback opens.', handoff: { label: 'Goes to the IIC team', role: 'IIC team', step: 4 } },
  ] },
  Mentor: { accent: 'var(--sage)', caption: 'You volunteer on your terms: availability and capacity are yours to set, and each proposal is yours to accept or decline.', steps: [
    { title: 'Create your mentoring profile.', body: 'Share your professional or higher-studies background and your areas of expertise.', vignette: 'Expertise chips build your profile.' },
    { title: 'Set availability and capacity.', body: 'Mark yourself available or unavailable and set how many students you can support. Change it any time.', vignette: 'A switch and capacity pips fill.' },
    { title: 'Review a proposal.', body: 'When the IIC team proposes a match you see the request it is based on.', vignette: 'An incoming proposal card slides in.' },
    { title: 'Accept or decline.', body: 'Volunteer only when the request suits you and fits your capacity. Your preferred first-contact method is shared only with the matched student.', vignette: 'Accept opens a locked contact card.', handoff: { label: 'Student receives the outcome', role: 'Student', step: 3 } },
    { title: 'Give high-level feedback.', body: 'Share how the relationship is going without any private conversation content.', vignette: 'Rating dots and structured fields.' },
  ] },
  'IIC team': { accent: 'var(--paper)', caption: 'Every decision is recorded with a date, and private conversations are never part of what you see.', steps: [
    { title: 'Review complete requests.', body: "See each student's request in one place: goal, concern, guidance areas and problem description.", vignette: 'Stacked request lines.' },
    { title: 'Consider suggestions.', body: 'Suggested mentors show matching expertise, availability and relevant profile information. You can also choose a mentor manually, with a recorded justification.', vignette: 'Ranked list with reason chips.' },
    { title: 'Approve, decline or revise.', body: 'Every match has human oversight. The decision, its date and the status are recorded.', vignette: 'Decision buttons and a recorded stamp.', handoff: { label: 'Goes to the mentor', role: 'Mentor', step: 2 } },
    { title: 'Monitor relationships.', body: 'View active and closed relationships with high-level activity. Private messages are never visible.', vignette: 'Rows with status pills.' },
    { title: 'Close and learn.', body: 'Close completed or inactive relationships with a reason category, and view aggregated participation and feedback.', vignette: 'Reason chips and abstract bars.' },
  ] },
}

export const faqs = [
  ['Who is it for?', 'Waypoint is for eligible IITM BS students approaching programme completion who want career, higher-studies, or employment guidance from alumni and recent graduates.'],
  ['Is there a chat or video call inside Waypoint?', 'No. Waypoint does not host chat or store conversations. After an approved match and mentor acceptance, you connect on the channel you choose—email, WhatsApp, Google Meet, or another preferred method.'],
  ['Who decides the match?', 'The platform suggests suitable mentors based on expertise and availability. The IIC team reviews and approves every match; nothing is auto-assigned.'],
  ['What does Waypoint record?', 'Only high-level activity: relationship status, that an interaction happened, and structured feedback. It never stores messages, transcripts, or meeting content.'],
] as const
