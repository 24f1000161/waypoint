// UI-only proposals to reconcile with the backend contract.
export type AuthRole = 'student' | 'mentor' | 'admin'
export type AuthOutcome =
  | { kind: 'success'; role: AuthRole }
  | { kind: 'notEligible' | 'alreadyRegistered' | 'accountCreated' | 'pendingApproval' | 'checkEmail' | 'mentorNotApproved' | 'deactivated' | 'sessionExpired' }
  | { kind: 'error'; error: 'invalidCredentials' | 'network' | 'server' | 'rateLimit' }

export type AuthRequest = { email: string; password?: string; rollNumber?: string }
