import gsap from 'gsap'
import { MotionPathPlugin, ScrollTrigger, SplitText } from 'gsap/all'

let registered = false

export function registerGsapPlugins() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin)
  registered = true
}

export { gsap, MotionPathPlugin, ScrollTrigger, SplitText }
