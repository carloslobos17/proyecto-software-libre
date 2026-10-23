import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"
import type { ProductPayload } from "../models/product"
import { createProduct } from "../service/product-service"
import type { CategoryResponse } from "../models/category"
import { getAllCategories } from "../service/category-service"

export interface ProductFormState {
    name: string
    categoryId: string | number
    sku: string
    description: string
    regularPrice: string
    offerPrice: string
    initialStock: string
    minStockAlert: string
}

const initialFormState: ProductFormState = {
    name: "",
    categoryId: 1,
    sku: "",
    description: "",
    regularPrice: "",
    offerPrice: "",
    initialStock: "",
    minStockAlert: ""
}

export function useProductViewModel() {
    const { token } = useAuth()
    const [form, setForm] = useState(initialFormState)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingCategoies, setIsLoadingCategories] = useState(false)
    const [categories, setCategories] = useState<CategoryResponse[]>([])

    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoadingCategories(true)
                const data = await getAllCategories(token)
                setCategories(data)
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error al cargar categorias")
            }finally{
                setIsLoadingCategories(false)
            }
        }
        fetchCategories()
    }, [token])


    const handleChange = (field: keyof ProductFormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const submit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!form.name.trim()) {
            setError("El nombre del producto es obligatorio")
            return
        }

        /**PARSEAR ALGUNOS DATOS DE PRECIOS */
        const regularPrice = parseFloat(form.regularPrice)
        const offerPrice = parseFloat(form.offerPrice)
        const initialStock = parseInt(form.initialStock, 10)
        const minStockAlert = parseInt(form.minStockAlert, 10)

        if (offerPrice > regularPrice) {
            setError("El precio de oferta no puede ser mayor al precio regular")
            return
        }

        const payload: ProductPayload = {
            name: form.name.trim(),
            categoryId: Number(form.categoryId),
            sku: form.sku.trim(),
            description: form.description.trim(),
            regularPrice: isNaN(regularPrice) ? 0 : regularPrice,
            offerPrice: isNaN(offerPrice) ? 0 : offerPrice,
            initialStock: isNaN(initialStock) ? 0 : initialStock,
            minStockAlert: isNaN(minStockAlert) ? 0 : minStockAlert
        }
        try {
            setIsLoading(true)
            setError("")
            setSuccess("")

            await createProduct(payload, token)
            setSuccess("Producto creado con exito")
            setForm(initialFormState)
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "No se pudo crear la categoria"
            )
        } finally {
            setIsLoading(false)
        }
    }
    return {
        form,
        handleChange,
        submit,
        isLoading,
        error,
        success,
        categories,
        isLoadingCategoies
    }
}