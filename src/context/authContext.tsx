import { createContext, useEffect, useMemo, useState } from "react"
import type { LoginResponse, UserResponse } from "../models/user"
import { clearAuth, getAuth, saveAuth } from "../core/authStorage"

export type AuthContextType = {
    token: string | null
    user: UserResponse | null
    isAuthenticated: boolean
    isHydrated: boolean
    login: (data: LoginResponse, remember?: boolean) => void
    logout: () => void
    updateUser: (user: UserResponse) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = getAuth()
    const [token, setToken] = useState<string | null>(auth?.token ?? null)
    const [user, setUser] = useState<UserResponse | null>(auth?.user ?? null)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        const auth = getAuth()
        if (auth) {
            setToken(auth.token)
            setUser(auth.user)
        }
        setIsHydrated(true)
    }, [])

    const login = (data: LoginResponse, remember = true) => {
        setToken(data.token)
        setUser(data.userResponse)
        saveAuth(data.token, data.userResponse, remember)
    }
    const updateUser = (updateUser: UserResponse) => {
        setUser(updateUser)
        const actualToken = token ?? getAuth()?.token ?? null
        if (actualToken) {
            saveAuth(actualToken, updateUser)
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        clearAuth()
    }

    const value = useMemo(
        () => ({
            token,
            user,
            isAuthenticated: Boolean(token),
            isHydrated,
            login,
            updateUser,
            logout
        }),
        [token, user, isHydrated]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}