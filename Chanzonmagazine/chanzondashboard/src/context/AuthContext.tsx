'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const AUTH_KEY = 'chanzon_dashboard_auth'
const USER = 'admin'
const PASS = 'chanzonmagazine'

type AuthContextValue = {
  isAuthenticated: boolean
  hasChecked: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getStored(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(AUTH_KEY) === 'true'
}

function setStored(value: boolean) {
  if (typeof window === 'undefined') return
  value ? localStorage.setItem(AUTH_KEY, 'true') : localStorage.removeItem(AUTH_KEY)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsAuthenticated(getStored())
    setHasChecked(true)
  }, [])

  const login = useCallback((username: string, password: string): boolean => {
    setError(null)
    if (username === USER && password === PASS) {
      setIsAuthenticated(true)
      setStored(true)
      return true
    }
    setError('Identifiants incorrects.')
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setStored(false)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, hasChecked, login, logout, error, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
