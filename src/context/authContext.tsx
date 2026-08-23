import { createContext, useEffect, useMemo, useState } from "react"
import type { LoginResponse, UserResponse } from "../models/user"
import { clearAuth, getAuth, saveAuth } from "../core/authStorage"

export type AuthContextType={
    token:string | null
    user:UserResponse | null
    isAuthenticated:boolean
    isHydrated:boolean
    login:(data:LoginResponse,remember?:boolean)=>void
    logout:()=>void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}:{children:React.ReactNode}){
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserResponse | null>(null)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        const auth = getAuth()
        if(auth){
            setToken(auth.token)
            setUser(auth.user)
        }
        setIsHydrated(true)
    }, [])

    const login =(data:LoginResponse,remember=true)=>{
        setToken(data.token)
        setUser(data.userResponse)
        saveAuth(data.token,data.userResponse,remember)
    }
    const logout=()=>{
        setToken(null)
        setUser(null)
        clearAuth()
    }

    const value = useMemo(
        ()=>({
            token,
            user,
            isAuthenticated:Boolean(token),
            isHydrated,
            login,
            logout
        }),
        [token,user,isHydrated]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}