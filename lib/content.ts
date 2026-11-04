export const PLATFORM_NAME = 'Waypoint'
export const guidanceAreas = [
  { name: 'Career exploration', description: 'Make sense of possible paths and choose a direction that fits your strengths.' },
  { name: 'Higher studies', description: 'Think through programmes, applications, research, and the next academic step.' },
  { name: 'Interview preparation', description: 'Practise the thinking and storytelling that helps you show up prepared.' },
  { name: 'Skill development', description: 'Identify the skills worth building for the path you want to take.' },
  { name: 'Employment and job search', description: 'Get perspective on roles, applications, and starting well in your first job.' },
]
export const steps = [
  ['01', 'Build your profile', 'Share the context that helps the platform suggest relevant mentors.'],
  ['02', 'Share your goal', "Tell us what you're working toward and what's holding you back."],
  ['03', 'IIC team review', 'The IIC team reviews suggested mentors and approves the match.'],
  ['04', 'Accept and connect', 'Your mentor accepts or declines. You receive their preferred contact method.'],
  ['05', 'Meet your way', 'Talk on your own channel, log that it happened, and give structured feedback.'],
] as const
export const faqs = [
  ['Who is it for?', 'Waypoint is for eligible IITM BS students approaching programme completion who want career, higher-studies, or employment guidance from alumni and recent graduates.'],
  ['Is there a chat or video call inside Waypoint?', 'No. Waypoint does not host chat or store conversations. After an approved match and mentor acceptance, you connect on the channel you choose—email, WhatsApp, Google Meet, or another preferred method.'],
  ['Who decides the match?', 'The platform suggests suitable mentors based on expertise and availability. The IIC team reviews and approves every match; nothing is auto-assigned.'],
  ['What does Waypoint record?', 'Only high-level activity: relationship status, that an interaction happened, and structured feedback. It never stores messages, transcripts, or meeting content.'],
] as const
