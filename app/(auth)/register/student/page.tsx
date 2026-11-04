import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/AuthForms'
export const metadata: Metadata = { title: 'Create a student account — Waypoint', description: 'Create an eligible student account on Waypoint.' }
export default function StudentRegisterPage() { return <RegisterForm role="student"/> }
