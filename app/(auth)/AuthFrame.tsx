'use client'
import { AuthShell } from '@/components/auth/AuthShell'
export function AuthFrame({ children }: { children: React.ReactNode }) { return <AuthShell>{children}</AuthShell> }
