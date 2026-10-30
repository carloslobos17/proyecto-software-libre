import { API_BASE_URL } from "../api/apiBase";
import type { CategoryPayload, CategoryResponse } from "../models/category";
import type { ProductResponse } from "../models/product";

export async function createCategory(
    payload: CategoryPayload,
    token: string | null
): Promise<CategoryResponse> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    }

    if (token) {
        headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}/categories/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        let message = "Error al crear la categoria"
        try {
            const err = await response.json()
            message = err?.message ?? message
        } catch (error) {
            console.log("Error", error);
        }
        throw new Error(message)
    }
    return response.json()
}

export async function getAllCategories(
    token: string | null
): Promise<CategoryResponse[]> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    }
    if (token) {
        headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "GET",
        headers
    })
    if (!response.ok) {
        let message = "Error al obtener las categorias"
        try {
            const err = await response.json()
            message = err?.message ?? message
        } catch (error) {
            console.log("Error", error);
        }
        throw new Error(message)
    }
    return response.json()

}

export async function getCategories(token: string | null): Promise<CategoryResponse[]> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    }

    if (token) {
        headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "GET",
        headers
    })
    if (!response.ok) {
        let message = "Error al obtener la categoria"
        try {
            const err = await response.json()
            message = err?.message ?? message
        } catch (error) {
            console.log("Error", error);
        }
        throw new Error(message)
    }
    return response.json()
}

export async function getProductsByCategoryId(
    categoryId:number | string,
    token:string | null
):Promise<ProductResponse[]>{
    const headers: Record<string, string> = {
        "Content-type": "application/json"
    }
    if(token){
        headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`
    }
     const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}`,{
        method:"GET",
        headers
     })
         if (!response.ok) {
        let message = "Error al traer los productos"
        try {
            const err = await response.json()
            message = err?.message ?? message
        } catch (error) {
            console.log("Error", error);
        }
        throw new Error(message)
    }
    return response.json()
}