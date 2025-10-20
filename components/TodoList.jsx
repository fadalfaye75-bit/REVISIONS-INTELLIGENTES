// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    const task = prompt('Nouvelle tâche / révision :')
    if (!task) return
    setTodos([...todos, { id: 'todo_' + Math.random().toString(36).slice(2, 8), task, done: false }])
  }

  const toggleDone = (id) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">To-do / Révisions</h3>
        <button onClick={addTodo} className="px-3 py-1 bg-indigo-600 text-white rounded">+ Ajouter</button>
      </div>
      <ul className="space-y-2 max-h-48 overflow-auto">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-700">
            <div className={`flex-1 ${todo.done ? 'line-through text-gray-400' : ''}`}>{todo.task}</div>
            <div className="flex gap-2">
              <button onClick={() => toggleDone(todo.id)} className="text-xs px-2 py-1 bg-green-100 rounded">
                {todo.done ? 'Fait' : 'Marquer fait'}
              </button>
              <button onClick={() => removeTodo(todo.id)} className="text-xs px-2 py-1 bg-red-100 rounded text-red-600">
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
