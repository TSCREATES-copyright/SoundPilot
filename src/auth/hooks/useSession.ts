import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { getCurrentUser, subscribeToAuthChanges } from '../services/authService'

interface SessionState {
  user: User | null
  isLoading: boolean
}

export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    user: getCurrentUser(),
    isLoading: true
  })

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setState({
        user,
        isLoading: false
      })
    })

    return unsubscribe
  }, [])

  return state
}
