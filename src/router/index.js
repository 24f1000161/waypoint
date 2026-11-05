import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import StudentView from '@/views/StudentView.vue'
import AdminView from '@/views/AdminView.vue'
import MentorView from '@/views/MentorView.vue'
const routes=[{path:'/',component:HomeView},{path:'/sign-in',component:AuthView,props:{mode:'sign-in'}},{path:'/register',component:AuthView,props:{mode:'register'}},{path:'/register/student',component:AuthView,props:{mode:'student'}},{path:'/register/mentor',component:AuthView,props:{mode:'mentor'}},{path:'/forgot-password',component:AuthView,props:{mode:'forgot'}},{path:'/reset-password',component:AuthView,props:{mode:'reset'}},{path:'/student',component:StudentView},{path:'/admin',component:AdminView},{path:'/admin/requests/:id',component:AdminView},{path:'/mentor',component:MentorView},{path:'/privacy',component:HomeView},{path:'/demos',component:HomeView,props:{demoSelector:true}}]
export default createRouter({history:createWebHistory(),routes,scrollBehavior:()=>({top:0})})
