import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthShell'
import { RegisterForm } from '@/components/auth/AuthForms'
export const metadata: Metadata = { title: 'Create a student account — Waypoint', description: 'Create an eligible student account on Waypoint.' }
export default function StudentRegisterPage() { return <AuthShell steps="student"><a className="skip-link" href="#content">Skip to form</a><RegisterForm role="student"/></AuthShell> }
