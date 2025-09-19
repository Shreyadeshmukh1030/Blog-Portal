"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  bio?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem("user")
    const storedAuth = localStorage.getItem("isAuthenticated")

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in real app this would be an API call
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email,
      avatar: "/placeholder.svg?key=user",
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(mockUser))
    localStorage.setItem("isAuthenticated", "true")
  }

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in real app this would be an API call
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: "/placeholder.svg?key=newuser",
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(mockUser))
    localStorage.setItem("isAuthenticated", "true")
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
