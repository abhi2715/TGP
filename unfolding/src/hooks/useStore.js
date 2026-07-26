import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'unfolding_v1'

const defaultState = {
  oneThing: '',
  intentions: [],          // [{ id, text, done }]
  todayMood: null,         // 'great' | 'okay' | 'hard'
  todayReflection: '',
  sparkIndex: 0,
  sparkDoneToday: false,
  jarItems: [],            // [{ id, tag, text, createdAt }]
  kindWords: [],           // [{ id, text }]
  clarityArchive: [],      // [{ id, summary, date }]
  userName: '',
  userAbout: '',
  features: {
    spark: true,
    grounding: true,
    space: true,
    clarity: true,
    settle: true,
  },
  reflectionHistory: [],   // [{ date, mood, text }]
  intentionHistory: [],    // [{ date, items }]
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function useStore() {
  const [state, setState] = useState(load)

  const update = useCallback((patch) => {
    setState(prev => {
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch }
      save(next)
      return next
    })
  }, [])

  // Archive intentions & reset daily on new day
  useEffect(() => {
    const today = new Date().toDateString()
    const lastDay = state._lastDay
    if (lastDay && lastDay !== today) {
      // archive yesterday
      if (state.intentions.length > 0) {
        update(prev => ({
          ...prev,
          intentionHistory: [
            { date: lastDay, items: prev.intentions },
            ...prev.intentionHistory.slice(0, 29),
          ],
          intentions: [],
          todayMood: null,
          todayReflection: '',
          sparkDoneToday: false,
          _lastDay: today,
        }))
      }
    } else if (!lastDay) {
      update({ _lastDay: today })
    }
  }, []) // eslint-disable-line

  return { state, update }
}
