import type { LoginPayload, LoginResponse } from "../models/user";

const API_BASE_URL = "https://api-ecommerce-5aby.onrender.com"

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
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