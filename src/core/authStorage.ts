import type { UserResponse } from "../models/user"

//GRABAR LA INFORMACION
const TOKEN_KEY = "auth_token"
const USER_KEY = "auth_user"

export function saveAuth(token:string, user:UserResponse, remember=true){
    const storage = remember ? localStorage : sessionStorage
    storage.setItem(TOKEN_KEY, token)
    storage.setItem(USER_KEY, JSON.stringify(user))
}

//TRAER LA INFORMACION
export function getAuth(){
    const token = localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
    const userRaw= localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY)

    if(!token || !userRaw) return null

    try {
        const user = JSON.parse(userRaw) as UserResponse
        return{token,user}
    } catch {
        return null
    }
}

//LIMPIAR LA INFORMACION
export function clearAuth(){
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
}