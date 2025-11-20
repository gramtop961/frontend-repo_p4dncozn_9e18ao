import Spline from '@splinetool/react-spline'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-3xl px-6">
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            LevelUp — Gamified Tasks & Progress
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 text-white/90 md:text-lg"
          >
            Build job-ready habits in 15 minutes a day. Complete quests, earn XP, and unlock your story.
          </motion.p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40" />
    </section>
  )
}
