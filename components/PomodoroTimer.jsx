// src/components/PomodoroTimer.jsx
import React, { useState, useEffect, useRef } from 'react'

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => setIsRunning(false)
  const resetTimer = () => {
    setIsRunning(false)
    setMinutes(25)
    setSeconds(0)
  }

  useEffect(() => {
    if (!isRunning) return
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          if (minutes === 0) {
            clearInterval(timerRef.current)
            alert('Pomodoro terminé ! 🚀')
            return 0
          }
          setMinutes((m) => m - 1)
          return 59
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [isRunning, minutes])

  const formatTime = (num) => num.toString().padStart(2, '0')

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
      <h3 className="font-medium mb-2">Pomodoro Timer</h3>
      <div className="text-3xl font-bold mb-4 text-center">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="flex justify-between gap-2">
        {!isRunning ? (
          <button onClick={startTimer} className="flex-1 px-3 py-1 bg-green-500 text-white rounded">
            Démarrer
          </button>
        ) : (
          <button onClick={pauseTimer} className="flex-1 px-3 py-1 bg-yellow-500 text-white rounded">
            Pause
          </button>
        )}
        <button onClick={resetTimer} className="flex-1 px-3 py-1 bg-red-500 text-white rounded">
          Réinitialiser
        </button>
      </div>
    </div>
  )
}
