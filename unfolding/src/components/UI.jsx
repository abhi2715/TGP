import React from 'react'

const s = {
  card: {
    background: 'var(--card)',
    border: '0.5px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '16px',
    marginBottom: '12px',
  },
  label: {
    fontSize: '11px',
    color: 'var(--sub)',
    letterSpacing: '.06em',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: '10px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '9px 12px',
    borderRadius: 'var(--radius-md)',
    border: '0.5px solid var(--border-med)',
    background: 'var(--bg)',
    color: 'var(--ink)',
    fontSize: '14px',
    fontFamily: 'var(--font)',
    outline: 'none',
  },
}

export function Card({ children, style, onClick }) {
  return (
    <div style={{ ...s.card, ...style }} onClick={onClick}>
      {children}
    </div>
  )
}

export function Label({ children }) {
  return <span style={s.label}>{children}</span>
}

export function TextInput({ style, ...props }) {
  return <input style={{ ...s.input, ...style }} {...props} />
}

export function Textarea({ rows = 3, style, ...props }) {
  return (
    <textarea
      rows={rows}
      style={{ ...s.input, resize: 'none', lineHeight: '1.5', ...style }}
      {...props}
    />
  )
}

export function Btn({ children, variant = 'default', size = 'md', style, ...props }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    border: '0.5px solid var(--border-med)',
    borderRadius: 'var(--radius-md)',
    background: 'none',
    color: 'var(--ink)',
    fontFamily: 'var(--font)',
    cursor: 'pointer',
    fontSize: size === 'sm' ? '12px' : '13px',
    padding: size === 'sm' ? '6px 12px' : '9px 16px',
    transition: 'opacity .15s',
  }
  const variants = {
    primary: { background: 'var(--sage)', border: '0.5px solid var(--sage)', color: '#fff' },
    danger: { color: '#c0392b', borderColor: '#c0392b' },
    ghost: { border: 'none', color: 'var(--sub)' },
  }
  return (
    <button style={{ ...base, ...(variants[variant] || {}), ...style }} {...props}>
      {children}
    </button>
  )
}

export function Toggle({ on, onToggle }) {
  return (
    <div
      role="switch"
      aria-checked={on}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onToggle()}
      style={{
        width: '40px', height: '22px', borderRadius: '11px',
        background: on ? 'var(--sage)' : 'var(--bg)',
        border: `1.5px solid ${on ? 'var(--sage)' : 'var(--border-med)'}`,
        cursor: 'pointer', position: 'relative', transition: 'background .2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: '2px', left: on ? '20px' : '2px',
        width: '14px', height: '14px', borderRadius: '50%',
        background: '#fff', transition: 'left .2s',
      }} />
    </div>
  )
}

export function Chip({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '12px', padding: '5px 12px', borderRadius: '20px',
        cursor: 'pointer',
        border: active ? '0.5px solid var(--sage)' : '0.5px solid var(--border)',
        background: active ? 'var(--sage-light)' : 'var(--bg)',
        color: active ? 'var(--sage)' : 'var(--sub)',
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  )
}

export function SectionHead({ children }) {
  return (
    <div style={{
      fontSize: '11px', fontWeight: '500', color: 'var(--sub)',
      textTransform: 'uppercase', letterSpacing: '.06em',
      padding: '16px 16px 4px',
    }}>
      {children}
    </div>
  )
}

export function Empty({ icon, children }) {
  return (
    <div style={{ textAlign: 'center', padding: '28px 16px', color: 'var(--hint)', fontSize: '13px' }}>
      {icon && <i className={`ti ti-${icon}`} style={{ fontSize: '28px', display: 'block', marginBottom: '8px', opacity: .5 }} />}
      {children}
    </div>
  )
}

export function Toast({ message }) {
  if (!message) return null
  return (
    <div style={{
      position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
      background: 'var(--sage)', color: '#fff', padding: '8px 18px',
      borderRadius: '20px', fontSize: '13px', zIndex: 999, pointerEvents: 'none',
    }}>
      {message}
    </div>
  )
}
