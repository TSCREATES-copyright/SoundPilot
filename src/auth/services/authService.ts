import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase'
import { normalizeEmail, safeTrim } from '../../utils/helpers'

export interface FirebaseAuthUserProfile {
  uid: string
  email: string
  username: string
  createdAt: unknown
}

export async function signUp(email: string, password: string, username: string): Promise<User> {
  const normalizedEmail = normalizeEmail(email)
  const trimmedUsername = safeTrim(username)

  const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, password)
  const user = credential.user

  const profile: FirebaseAuthUserProfile = {
    uid: user.uid,
    email: user.email ?? normalizedEmail,
    username: trimmedUsername,
    createdAt: serverTimestamp()
  }

  await setDoc(doc(db, 'users', user.uid), profile, { merge: true })
  return user
}

export async function login(email: string, password: string): Promise<User> {
  const normalizedEmail = normalizeEmail(email)
  const credential = await signInWithEmailAndPassword(auth, normalizedEmail, password)
  return credential.user
}

export async function logout(): Promise<void> {
  await signOut(auth)
}

export function getCurrentUser(): User | null {
  return auth.currentUser
}

export function subscribeToAuthChanges(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback)
}
