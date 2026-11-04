import { AdminRequestReview } from '@/components/admin/AdminRequestReview'
export const metadata={title:'Request review (demo) — Waypoint',robots:{index:false,follow:false}}
export default async function RequestReviewPage({params}){const {requestId}=await params;return <AdminRequestReview requestId={requestId}/>} 
