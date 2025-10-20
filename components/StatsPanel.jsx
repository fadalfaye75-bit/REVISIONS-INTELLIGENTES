// src/components/StatsPanel.jsx
import React, { useState, useEffect } from 'react'

export default function StatsPanel() {
  const [todos, setTodos] = useState([])
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodos(storedTodos)
    const doneCount = storedTodos.filter(t => t.done).length
    setCompleted(doneCount)
  }, [])

  useEffect(() => {
    const doneCount = todos.filter(t => t.done).length
    setCompleted(doneCount)
  }, [todos])

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
      <h3 className="font-medium mb-2">Progression des révisions</h3>
      <p className="mb-2">
        Tâches complétées : {completed} / {todos.length}
      </p>
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: todos.length ? `${(completed / todos.length) * 100}%` : '0%' }}
        ></div>
      </div>
    </div>
  )
}
