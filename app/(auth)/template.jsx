'use client'
import { useEffect } from 'react'
export default function AuthTemplate({children}){useEffect(()=>{document.querySelector('.auth-form-column')?.classList.add('auth-template-enter')},[]);return children}
