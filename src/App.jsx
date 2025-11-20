import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Coach from './components/Coach'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Hero />
      <Dashboard />
      <Coach />
      <footer className="py-12 text-center text-white/60">LevelUp MVP • Demo Mode</footer>
    </div>
  )
}

export default App
