// src/components/Settings.jsx
import React, { useState, useEffect } from 'react'

export default function Settings() {
  const [pomodoroDuration, setPomodoroDuration] = useState(
    () => parseInt(localStorage.getItem('pomodoroDuration')) || 25
  )

  const [breakDuration, setBreakDuration] = useState(
    () => parseInt(localStorage.getItem('breakDuration')) || 5
  )

  useEffect(() => {
    localStorage.setItem('pomodoroDuration', pomodoroDuration)
    localStorage.setItem('breakDuration', breakDuration)
  }, [pomodoroDuration, breakDuration])

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
      <h3 className="font-medium mb-2">Paramètres</h3>

      <div className="mb-4">
        <label className="block mb-1">Durée Pomodoro (minutes)</label>
        <input
          type="number"
          min="5"
          max="120"
          value={pomodoroDuration}
          onChange={(e) => setPomodoroDuration(parseInt(e.target.value))}
          className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block mb-1">Durée pause (minutes)</label>
        <input
          type="number"
          min="1"
          max="60"
          value={breakDuration}
          onChange={(e) => setBreakDuration(parseInt(e.target.value))}
          className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
      </div>
    </div>
  )
}
