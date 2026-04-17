import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import './authStyles.css'

type AuthMode = 'login' | 'signup'

export default function AuthContainer() {
  const navigate = useNavigate()
  const { login, signup, isLoading } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')

  const isLogin = mode === 'login'

  const handleLogin = async (email: string, password: string) => {
    await login(email, password)
    navigate('/', { replace: true })
  }

  const handleSignup = async (username: string, email: string, password: string) => {
    await signup(username, email, password)
    navigate('/', { replace: true })
  }

  return (
    <div className="auth-shell">
      <div className="auth-layout">
        <aside className="auth-brand">
          <div className="auth-brand-content">
            <div className="auth-logo-row">
              <img className="auth-logo" src="/favicon.svg" alt="SoundPilot logo" />
              <p className="auth-brand-name">SoundPilot</p>
            </div>
            <h1 className="auth-brand-title">Create, finish, and scale your music workflow.</h1>
            <p className="auth-brand-subtitle">
              SoundPilot keeps your sessions, drafts, and projects in sync so every idea stays within reach.
            </p>
          </div>
          <p className="auth-brand-foot">
          </p>
        </aside>

        <section className="auth-panel">
          <div className="auth-card">
            <div className="auth-toggle" role="tablist" aria-label="Authentication mode">
              <button
                type="button"
                role="tab"
                aria-selected={isLogin}
                onClick={() => setMode('login')}
                className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
              >
                Login
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isLogin}
                onClick={() => setMode('signup')}
                className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
              >
                Signup
              </button>
            </div>

            <h2 className="auth-card-heading">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p className="auth-card-subheading">
              {isLogin
                ? 'Sign in to continue your next session.'
                : 'Start your SoundPilot workspace in under a minute.'}
            </p>

            {isLogin ? (
              <LoginForm isLoading={isLoading} onSubmit={handleLogin} />
            ) : (
              <SignupForm isLoading={isLoading} onSubmit={handleSignup} />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
