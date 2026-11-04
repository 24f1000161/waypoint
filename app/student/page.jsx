import { StudentDashboard } from '@/components/student/StudentDashboard'
import { scenarioIds } from '@/lib/demo/student-scenarios'
export default async function StudentPage({searchParams}){const params=await searchParams;const scenario=scenarioIds.includes(params?.scenario)?params.scenario:'proposed';return <StudentDashboard scenario={scenario}/>} 
