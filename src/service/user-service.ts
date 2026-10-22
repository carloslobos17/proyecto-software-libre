import type { LoginPayload, LoginResponse, UserRequest } from "../models/user";

const API_BASE_URL = "https://api-ecommerce-5aby.onrender.com"

export async function loginUser(payload:LoginPayload): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        let message = "Error al iniciar sesion"
        try {
            const err = await response.json()
            message = err?.message ?? message
        }catch(error){
            console.log("Error", error);
        }
        throw new Error(message)
    }
    return response.json()
}

export async function udpateUserProfile(
    userId:number,
    payload:UserRequest,
    token:string | null
){
    console.log("TOKEN", token);
    const formData = new FormData()
    formData.append("name",payload.name)
    formData.append("lastname", payload.lastname)
    formData.append("phone", payload.phone)
    const headerToken = token?.startsWith("Bearer ") ? token : `Bearer ${token}`
    const response = await fetch(`${API_BASE_URL}/users/upload/${userId}`,{
        method:"PUT",
        headers:{
            Authorization:headerToken
        },
        body:formData

    })
    if(!response.ok){
        const errorText = await response.text()
        throw new Error(errorText || "Error al actualizar usuario")
    }
    return response.json()

}