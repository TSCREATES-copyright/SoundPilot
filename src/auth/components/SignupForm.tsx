import { useMemo, useState, type FormEvent } from 'react'
import {
  validateEmailFormat,
  validatePasswordStrength,
  validateUsernameRules
} from '../services/validationService'

interface SignupFormProps {
  isLoading: boolean
  onSubmit: (username: string, email: string, password: string) => Promise<void>
}

export default function SignupForm({ isLoading, onSubmit }: SignupFormProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const validationError = useMemo(() => {
    return (
      validateUsernameRules(username) ??
      validateEmailFormat(email) ??
      validatePasswordStrength(password)
    )
  }, [email, password, username])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      await onSubmit(username, email, password)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed. Please try again.'
      setError(message)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label className="auth-label" htmlFor="signup-username">
          Username
        </label>
        <input
          id="signup-username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="auth-input"
          placeholder="your_name"
          required
        />
      </div>

      <div className="auth-field">
        <label className="auth-label" htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="auth-input"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="auth-field">
        <label className="auth-label" htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="auth-input"
          placeholder="At least 6 characters"
          required
        />
      </div>

      {error ? <p className="auth-error">{error}</p> : null}

      <button
        type="submit"
        disabled={isLoading}
        className="auth-submit"
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}
