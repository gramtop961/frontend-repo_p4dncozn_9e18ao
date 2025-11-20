import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Coach() {
  const [plan, setPlan] = useState([])
  const [prompt, setPrompt] = useState('How should I practice Excel for interviews?')
  const [loading, setLoading] = useState(false)

  async function ask() {
    setLoading(true)
    const res = await fetch(`${API}/api/coach/query`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) })
    const data = await res.json()
    setPlan(data.plan || [])
    setLoading(false)
  }

  useEffect(() => { ask() }, [])

  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">AI Coach</h3>
        </div>
        <div className="flex gap-3">
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="flex-1 rounded-lg px-4 py-2 bg-slate-800 border border-white/10" />
          <button onClick={ask} className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-slate-900 font-semibold">Ask</button>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {plan.map((d) => (
            <div key={d.day} className="p-4 rounded-xl bg-slate-800 border border-white/10">
              <p className="font-semibold">Day {d.day}: {d.task}</p>
              <p className="text-sm text-white/70">{d.minutes} minutes</p>
              {d.links?.length > 0 && (
                <div className="mt-2 text-sm text-white/80 space-y-1">
                  {d.links.map((l, i) => (<a className="underline" key={i} href={l} target="_blank" rel="noreferrer">Link {i+1}</a>))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
