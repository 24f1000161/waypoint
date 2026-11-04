'use client'
import { createContext, useContext, useMemo, useReducer } from 'react'
import { ADMIN_REQUESTS } from '@/lib/demo/admin-data'
const AdminDemoContext=createContext(null)
const initialState={requests:ADMIN_REQUESTS.map(item=>({...item})),events:[{id:'event-1',date:'4 Nov 2026',text:'You approved a mentor proposal for REQ-2045.'},{id:'event-2',date:'3 Nov 2026',text:'Mentor declined REQ-2047; request needs a rematch.'}],dismissed:[]}
function reducer(state,action){switch(action.type){case 'reset':return initialState;case 'move':return {...state,requests:state.requests.map(r=>r.id===action.id?{...r,status:action.status,mentor:action.mentor||r.mentor}:r),events:[{id:`event-${Date.now()}`,date:'4 Nov 2026',text:action.text},...state.events]};case 'dismiss':return {...state,dismissed:[...new Set([...state.dismissed,action.name])]};case 'undo-dismiss':return {...state,dismissed:state.dismissed.filter(name=>name!==action.name)};default:return state}}
export function AdminDemoProvider({children}){const [state,dispatch]=useReducer(reducer,initialState);const value=useMemo(()=>({state,dispatch}),[state]);return <AdminDemoContext.Provider value={value}>{children}</AdminDemoContext.Provider>}
export function useAdminDemo(){const value=useContext(AdminDemoContext);if(!value)throw new Error('useAdminDemo must be used inside AdminDemoProvider');return value}
