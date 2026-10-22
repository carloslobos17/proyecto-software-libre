import { useState } from "react"
import { useAuth } from "../context/useAuth"
import { API_BASE_URL } from "../api/apiBase";
import type { LoginPayload, LoginResponse, UserRequest } from "../models/user";
export function useProfileViewModel(){
    const {user, updateUser, token}=useAuth()

    const [form, setForm] = useState({
        name:user?.name ?? "",
        lastname:user?.lastName ?? user?.lastName ?? "",
        phone:user?.phone ?? ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleChange=(field:keyof typeof form,value:string)=>{
        setForm((prev)=>({...prev, [field]:value}))
    }

    const submit =async()=>{
        if(!user?.id){
            setError("No hay usuario logueado")
            return
        }
        try {
            setIsLoading(true)
            setError("")
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "no se pudo actualizar el usuario"
            )
        }finally{
                setIsLoading(false)
            }
    }
    return{
        form,
        handleChange,
        submit,
        isLoading,
        error,
        success
    }
}
export async function loginUser(payload:LoginPayload):Promise<LoginResponse>{
    const response = await fetch(`${API_BASE_URL}/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
    })

    if(!response.ok){
        let message="Error al iniciar sesion"
        try {
            const err= await response.json()
            message = err?.message ?? message
        } catch (error) {
            console.log("Error",error);
        }
        throw new Error(message)
    }
    return response.json()
}

