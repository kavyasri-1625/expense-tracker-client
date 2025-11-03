import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 transition"
    >
      <span className="text-xs font-medium">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <span className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative">
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white dark:bg-slate-300 transition-all ${theme === 'dark' ? 'right-0.5' : 'left-0.5'}`}></span>
      </span>
    </button>
  )
}
