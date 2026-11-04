import { AdminDemoProvider } from '@/components/admin/AdminDemoProvider'
export const metadata={robots:{index:false,follow:false}}
export default function AdminLayout({children}){return <AdminDemoProvider>{children}</AdminDemoProvider>}
