'use client'

import { Check, Circle, Eye, EyeOff, Loader2, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

export function FormField({ id, label, hint, error, children, aside }: { id: string; label: string; hint?: string; error?: string; children: ReactNode; aside?: ReactNode }) {
  return <div className="auth-field"><div className="auth-field-label-row"><label htmlFor={id}>{label}</label>{aside}</div>{hint && <span className="auth-field-hint" id={`${id}-hint`}>{hint}</span>}{children}{error && <span className="auth-error" id={`${id}-error`} role="alert"><TriangleAlert size={14} aria-hidden="true"/>{error}</span>}</div>
}

export function TextInput({ id, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string }) {
  const describedBy = [props['aria-describedby'], error ? `${id}-error` : null, props['aria-describedby'] ? null : `${id}-hint`].filter(Boolean).join(' ') || undefined
  return <input {...props} id={id} className={`auth-input ${props.className ?? ''}`} aria-invalid={error ? true : undefined} aria-describedby={describedBy}/>
}

export function PasswordRequirements({ value }: { value: string }) {
  const valid = value.length >= 8
  return <ul className="auth-password-rules" aria-label="Password requirements"><li className={`auth-password-rule ${valid ? 'is-valid' : ''}`}>{valid ? <Check size={14} aria-hidden="true"/> : <Circle size={12} aria-hidden="true"/>}<span>At least 8 characters</span></li></ul>
}

export function PasswordInput({ id, error, value, rules = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string; rules?: boolean }) {
  const [visible, setVisible] = useState(false)
  const describedBy = [props['aria-describedby'], error ? `${id}-error` : null, rules ? `${id}-rules` : null].filter(Boolean).join(' ') || undefined
  return <><div className="auth-input-wrap"><input {...props} id={id} value={value} type={visible ? 'text' : 'password'} className={`auth-input auth-password-input ${props.className ?? ''}`} aria-invalid={error ? true : undefined} aria-describedby={describedBy}/><button type="button" className="auth-password-toggle" onClick={() => setVisible((state) => !state)} aria-pressed={visible} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>{rules && <div id={`${id}-rules`}><PasswordRequirements value={String(value ?? '')}/></div>}</>
}

export function SubmitButton({ children, loading, loadingLabel }: { children: ReactNode; loading?: boolean; loadingLabel?: string }) { return <button className="btn btn-accent auth-submit" type="submit" aria-busy={loading || undefined}>{loading ? <><Loader2 size={17} className="auth-spinner" aria-hidden="true"/><span>{loadingLabel ?? 'Working…'}</span></> : <>{children}<span aria-hidden="true">↗</span></>}</button> }

export function FormAlert({ tone = 'error', children }: { tone?: 'error' | 'info' | 'success'; children: ReactNode }) { const Icon = tone === 'error' ? TriangleAlert : tone === 'success' ? Check : Circle; return <div className={`auth-alert auth-alert-${tone}`} role="alert" tabIndex={-1}><Icon size={16} aria-hidden="true"/><span>{children}</span></div> }
