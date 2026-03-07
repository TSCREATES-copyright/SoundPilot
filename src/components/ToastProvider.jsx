import { createContext, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

const typeMeta = {
  success: { icon: '✅', border: 'border-l-[#22c55e]' },
  warning: { icon: '⚠️', border: 'border-l-[#f59e0b]' },
  error: { icon: '❌', border: 'border-l-[#ef4444]' },
  info: { icon: '💡', border: 'border-l-[#3b82f6]' }
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = (id) => {
    setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast)))

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 220)
  }

  const push = (type, message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const toast = { id, type, message, visible: true }

    setToasts((prev) => {
      const next = [...prev, toast]
      if (next.length > 4) next.shift()
      return next
    })

    setTimeout(() => dismiss(id), 4000)
  }

  const api = useMemo(
    () => ({
      success: (message) => push('success', message),
      warning: (message) => push('warning', message),
      error: (message) => push('error', message),
      info: (message) => push('info', message)
    }),
    []
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div 
        style={{
          position: 'fixed',
          bottom: '96px', // above the 80px player bar
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '8px',
          pointerEvents: 'none'
        }}
        className="w-[min(380px,90vw)]"
      >
        {toasts.map((toast) => {
          const meta = typeMeta[toast.type] || typeMeta.info
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto border-l-4 ${meta.border} rounded-lg border border-border bg-[#181818] p-3 shadow-lg transition-all duration-200 ${
                toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-white">
                  <span className="mr-2">{meta.icon}</span>
                  {toast.message}
                </p>
                <button
                  type="button"
                  className="rounded px-1 text-xs text-zinc-400 hover:bg-zinc-800"
                  onClick={() => dismiss(toast.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export { ToastProvider, useToast }
