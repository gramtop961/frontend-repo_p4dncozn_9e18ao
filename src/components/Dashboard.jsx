import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard() {
  const [token, setToken] = useState(null)
  const [me, setMe] = useState(null)
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    // quick demo signup if no token
    const t = localStorage.getItem('demo_token')
    if (t) {
      setToken(t)
      fetchMe(t)
      fetchTasks(t)
    } else {
      demoSignup()
    }
  }, [])

  async function demoSignup() {
    const name = 'Demo User'
    const email = `demo_${Math.random().toString(36).slice(2,7)}@local.dev`
    const res = await fetch(`${API}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email }) })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('demo_token', data.token)
      setToken(data.token)
      fetchMe(data.token)
    }
  }

  async function fetchMe(t) {
    const res = await fetch(`${API}/api/user/me`, { headers: { 'x-token': t } })
    if (res.ok) setMe(await res.json())
  }

  async function fetchTasks(t) {
    const res = await fetch(`${API}/api/tasks`, { headers: { 'x-token': t } })
    if (res.ok) {
      const d = await res.json()
      setTasks(d.items)
    }
  }

  async function addTask(e) {
    e.preventDefault()
    if (!title) return
    setStatus('Adding...')
    const res = await fetch(`${API}/api/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-token': token }, body: JSON.stringify({ type: 'todo', title, est_minutes: 15, xp_value: 15 }) })
    setTitle('')
    setStatus('')
    await fetchTasks(token)
  }

  async function completeTask(id) {
    const res = await fetch(`${API}/api/tasks/${id}/complete`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-token': token }, body: JSON.stringify({ success: true, difficulty: 'normal' }) })
    if (res.ok) {
      const payload = await res.json()
      alert(`+${payload.gained_xp} XP${payload.leveled_up ? ' — Level Up! 🎉' : ''}`)
      fetchMe(token)
      fetchTasks(token)
    }
  }

  return (
    <section className="relative bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Home Dashboard</h2>
            <p className="text-white/70">Today\'s quests and your progress</p>
          </div>
          {me && (
            <div className="text-right">
              <p className="font-semibold">{me.user.name}</p>
              <p className="text-sm text-white/70">Lvl {me.profile?.level || 1} • {me.profile?.xp || 0} XP</p>
            </div>
          )}
        </div>

        <form onSubmit={addTask} className="mt-6 flex gap-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quick add a quest..." className="flex-1 rounded-lg px-4 py-2 bg-slate-800 border border-white/10 focus:outline-none" />
          <button className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold">Add</button>
        </form>
        {status && <p className="mt-2 text-sm text-white/60">{status}</p>}

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {tasks.map(t => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-slate-800 border border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-sm text-white/60">{t.est_minutes} min • {t.type}</p>
                </div>
                <button onClick={() => completeTask(t.id)} className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold">Complete</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
