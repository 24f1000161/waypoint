import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthShell'
import { RegisterForm } from '@/components/auth/AuthForms'
export const metadata: Metadata = { title: 'Join as a mentor — Waypoint', description: 'Create a mentor account on Waypoint.' }
export default function MentorRegisterPage() { return <AuthShell steps="mentor"><a className="skip-link" href="#content">Skip to form</a><RegisterForm role="mentor"/></AuthShell> }
