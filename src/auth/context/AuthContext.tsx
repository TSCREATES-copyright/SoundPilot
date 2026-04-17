import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import type { User } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { login as loginUser, logout as logoutUser, signUp } from '../services/authService'
import { onAuthStateChanged } from 'firebase/auth'

interface AuthContextValue {
  currentUser: User | null
  loading: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await loginUser(email, password)
  }, [])

  const signup = useCallback(async (username: string, email: string, password: string) => {
    await signUp(email, password, username)
  }, [])

  const logout = useCallback(async () => {
    await logoutUser()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      loading,
      isLoading: loading,
      login,
      signup,
      logout
    }),
    [currentUser, loading, login, logout, signup]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider.')
  }
  return context
}
