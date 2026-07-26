import React, { useState, useRef, useEffect } from 'react'
import { Card, Label, Btn } from '../components/UI.jsx'

const PHASES = ['Breathe in', 'Hold', 'Breathe out', 'Hold']

export default function Settle() {
  // Box breathing
  const [breatheActive, setBreatheActive] = useState(false)
  const [phase, setPhase] = useState(0)
  const [count, setCount] = useState(4)
  const [rounds, setRounds] = useState(0)
  const timerRef = useRef(null)

  // Colour fill
  const [fillActive, setFillActive] = useState(false)

  // Grounding
  const [groundChecked, setGroundChecked] = useState([false, false, false, false, false])

  const groundingSteps = [
    'Name 5 things you can see',
    'Touch 4 things you can feel',
    'Listen for 3 things you can hear',
    'Notice 2 things you can smell',
    'Notice 1 thing you can taste',
  ]

  function stopBreathe() {
    setBreatheActive(false)
    clearTimeout(timerRef.current)
  }

  function resetBreathe() {
    stopBreathe()
    setPhase(0)
    setCount(4)
    setRounds(0)
  }

  useEffect(() => {
    if (!breatheActive) return
    if (count > 0) {
      timerRef.current = setTimeout(() => setCount(c => c - 1), 1000)
    } else {
      timerRef.current = setTimeout(() => {
        const next = (phase + 1) % 4
        if (next === 0) setRounds(r => r + 1)
        setPhase(next)
        setCount(4)
      }, 400)
    }
    return () => clearTimeout(timerRef.current)
  }, [breatheActive, phase, count])

  const ringScale = (phase === 0 && count < 4) || phase === 1 ? 1.3 : 1

  function startColourFill() {
    if (fillActive) return
    setFillActive(true)
    setTimeout(() => setFillActive(false), 8500)
  }

  function toggleGround(i) {
    setGroundChecked(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>

      {/* Box breathing */}
      <Card style={{ textAlign: 'center' }}>
        <Label>Box breathing · 4 counts</Label>
        <div
          style={{
            width: '120px', height: '120px', borderRadius: '50%',
            border: '3px solid var(--sage)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '20px auto',
            transform: `scale(${ringScale})`,
            background: ringScale > 1 ? 'var(--sage-light)' : 'transparent',
            borderStyle: phase === 1 || phase === 3 ? 'dashed' : 'solid',
            transition: 'all .4s ease',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--sage)' }}>
              {breatheActive ? PHASES[phase] : 'Ready'}
            </div>
            {breatheActive && (
              <div style={{ fontSize: '28px', fontWeight: '500', color: 'var(--sage)', marginTop: '2px' }}>{count}</div>
            )}
          </div>
        </div>

        <div style={{ height: '4px', background: 'var(--bg)', borderRadius: '2px', margin: '0 auto', maxWidth: '200px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ height: '100%', background: 'var(--sage)', borderRadius: '2px', width: breatheActive ? `${((4 - count) / 4) * 100}%` : '0%', transition: 'width .8s' }} />
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Btn
            variant="primary"
            onClick={() => breatheActive ? stopBreathe() : setBreatheActive(true)}
          >
            <i className={`ti ti-player-${breatheActive ? 'pause' : 'play'}`} aria-hidden="true" />
            {breatheActive ? 'Pause' : (rounds > 0 ? 'Resume' : 'Start')}
          </Btn>
          <Btn onClick={resetBreathe}>Reset</Btn>
        </div>

        {rounds > 0 && (
          <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sub)' }}>
            {rounds} round{rounds !== 1 ? 's' : ''} complete
          </p>
        )}
      </Card>

      {/* Colour fill */}
      <Card>
        <Label>Colour fill · Grounding</Label>
        <p style={{ fontSize: '13px', color: 'var(--sub)', marginBottom: '12px' }}>Breathe slowly and watch it fill.</p>
        <div
          onClick={startColourFill}
          style={{
            height: '120px', borderRadius: 'var(--radius-md)',
            border: '0.5px solid var(--border)', overflow: 'hidden',
            position: 'relative', cursor: fillActive ? 'default' : 'pointer',
          }}
        >
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: fillActive ? '100%' : '0%',
            background: 'var(--sage)', transition: 'height 8s linear',
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '13px',
            color: fillActive ? '#fff' : 'var(--sub)',
            fontWeight: fillActive ? '500' : '400',
            transition: 'color .5s',
          }}>
            {fillActive ? 'Breathe…' : 'Tap to begin'}
          </div>
        </div>
      </Card>

      {/* 5-4-3-2-1 Grounding */}
      <Card>
        <Label>5-4-3-2-1 · Grounding</Label>
        {groundingSteps.map((step, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 4 ? '0.5px solid var(--border)' : 'none' }}
          >
            <div
              onClick={() => toggleGround(i)}
              style={{
                width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, cursor: 'pointer',
                border: groundChecked[i] ? 'none' : '1.5px solid var(--border-med)',
                background: groundChecked[i] ? 'var(--sage)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                transition: 'all .15s',
              }}
            >
              {groundChecked[i] && <i className="ti ti-check" style={{ fontSize: '13px' }} />}
            </div>
            <span style={{ fontSize: '14px', color: groundChecked[i] ? 'var(--mist)' : 'var(--ink)', textDecoration: groundChecked[i] ? 'line-through' : 'none', transition: 'color .15s' }}>
              {step}
            </span>
          </div>
        ))}
        <Btn
          size="sm"
          style={{ marginTop: '10px' }}
          onClick={() => setGroundChecked([false, false, false, false, false])}
        >
          Reset
        </Btn>
      </Card>

      <div style={{ height: '8px' }} />
    </div>
  )
}
