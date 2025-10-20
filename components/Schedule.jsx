// src/components/Schedule.jsx
import React, { useState, useEffect } from 'react'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function Schedule() {
  const [timetable, setTimetable] = useState(() => {
    return JSON.parse(localStorage.getItem('timetable') || '[]')
  })

  useEffect(() => {
    localStorage.setItem('timetable', JSON.stringify(timetable))
  }, [timetable])

  // Ajouter un créneau
  const addSlot = () => {
    const day = prompt('Jour (ex: Lundi)')
    if (!DAYS.includes(day)) return alert('Jour invalide')
    const start = prompt('Heure début (HH:MM)')
    const end = prompt('Heure fin (HH:MM)')
    const subject = prompt('Matière')
    if (!subject) return
    const slot = {
      id: 'slot_' + Math.random().toString(36).slice(2, 8),
      day,
      start,
      end,
      subject,
    }
    setTimetable([...timetable, slot])
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-lg">Emploi du temps</h2>
        <button onClick={addSlot} className="px-3 py-1 bg-indigo-600 text-white rounded">
          + Ajouter un créneau
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day) => (
          <div key={day} className="p-2 border rounded min-h-[120px]">
            <div className="font-medium mb-2">{day}</div>
            <div className="space-y-2">
              {timetable
                .filter((slot) => slot.day === day)
                .sort((a, b) => a.start.localeCompare(b.start))
                .map((slot) => (
                  <div
                    key={slot.id}
                    className="p-2 rounded bg-gray-50 dark:bg-gray-700 text-sm"
                  >
                    <div className="font-medium">{slot.subject}</div>
                    <div className="text-xs text-gray-500">
                      {slot.start} — {slot.end}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
