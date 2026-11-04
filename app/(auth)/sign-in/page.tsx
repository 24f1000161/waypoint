import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthShell'
import { SignInForm } from '@/components/auth/AuthForms'

export const metadata: Metadata = { title: 'Sign in — Waypoint', description: 'Sign in to your Waypoint account.' }
export default function SignInPage() { return <AuthShell><SignInForm/></AuthShell> }
