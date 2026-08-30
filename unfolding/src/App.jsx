import React, { useState, useCallback } from 'react'
import { useStore } from './hooks/useStore.js'
import { Toast } from './components/UI.jsx'
import Home from './pages/Home.jsx'
import Space from './pages/Space.jsx'
import Settle from './pages/Settle.jsx'
import Clarity from './pages/Clarity.jsx'
import Settings from './pages/Settings.jsx'

const NAV = [
  { key: 'home',     label: 'Home',    icon: 'home' },
  { key: 'space',    label: 'Space',   icon: 'jar' },
  { key: 'settle',   label: 'Settle',  icon: 'wave-sine' },
  { key: 'clarity',  label: 'Clarity', icon: 'brain' },
  { key: 'settings', label: 'You',     icon: 'user' },
]

export default function App() {
  const { state, update } = useStore()
  const [page, setPage] = useState('home')
  const [toast, setToast] = useState(null)
  const toastTimer = React.useRef(null)

  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(null), 1800)
  }, [])

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })

  const pages = { home: Home, space: Space, settle: Settle, clarity: Clarity, settings: Settings }
  const PageComponent = pages[page]

  return (
    <div style={{ maxWidth: '430px', margin: '0 auto', height: '100vh', overflow: 'hidden', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        padding: '16px 20px',
        background: 'var(--card)',
        borderBottom: '0.5px solid var(--border)',
        zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: 'var(--warm)', fontWeight: '600', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
            {today}
          </div>
          <img src="/logo.png" alt="The Growth Project Logo" style={{ height: '64px', width: 'auto', objectFit: 'contain', marginLeft: '-4px' }} />
        </div>
        <button
          onClick={() => setPage('settings')}
          aria-label="Settings"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sub)', fontSize: '24px', lineHeight: 1, padding: '4px' }}
        >
          <i className="ti ti-settings" aria-hidden="true" />
        </button>
      </header>

      {/* Page content */}
      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
        <PageComponent state={state} update={update} showToast={showToast} />
      </main>

      {/* Bottom nav */}
      <nav style={{
        position: 'fixed', bottom: 0,
        left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '430px',
        background: 'var(--card)',
        borderTop: '0.5px solid var(--border)',
        display: 'flex', zIndex: 100,
      }}>
        {NAV.map(item => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '3px', padding: '10px 4px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: page === item.key ? 'var(--sage)' : 'var(--hint)',
              fontSize: '10px', fontFamily: 'var(--font)',
              transition: 'color .15s',
            }}
            aria-label={item.label}
          >
            <i className={`ti ti-${item.icon}`} style={{ fontSize: '20px' }} aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </nav>

      <Toast message={toast} />
    </div>
  )
}
