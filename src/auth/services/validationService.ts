const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,24}$/

export function validateEmailFormat(email: string): string | null {
  if (!email.trim()) return 'Email is required.'
  if (!EMAIL_REGEX.test(email.trim())) return 'Enter a valid email address.'
  return null
}

export function validatePasswordStrength(password: string): string | null {
  if (!password) return 'Password is required.'
  if (password.length < 6) return 'Password must be at least 6 characters.'
  return null
}

export function validateUsernameRules(username: string): string | null {
  if (!username.trim()) return 'Username is required.'
  if (!USERNAME_REGEX.test(username.trim())) {
    return 'Username must be 3-24 chars using letters, numbers, or underscore.'
  }
  return null
}
