// src/components/ThemeSwitcher.jsx
import React, { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  // Récupère le thème actuel ou utilise le thème du système
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Applique le thème et sauvegarde dans localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    >
      {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
    </button>
  )
}
