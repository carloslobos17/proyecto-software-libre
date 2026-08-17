import { useState } from "react";
import type { RegisterPayload } from "../models/register";
import { registerUser } from "../service/register-service";

export function useRegisterViewModel() {
    const [form, setForm] = useState<RegisterPayload>({
        name: "",
        lastname: "",
        phone: "",
        email: "",
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (field: keyof RegisterPayload, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }))
    }
    const validate=() => {
        if (!form.name || !form.lastname || !form.phone || !form.email || !form.password) {
            return "Completa todos los campos"
        }

        if(form.password.length < 6){
            return "La contraseña debe de tener al menos 6 caracteres"
        }
        if(form.password !== confirmPassword){
            return "Las contraseñas no coinciden"
        }
        return ""
    }

    const submit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setError("")

        const validationMessage = validate()
        if(validationMessage){
            setError(validationMessage)
            return
        }

        setIsLoading(true)

        try {
            const response = await registerUser(form)
            console.log(response);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false) 
        }
    }
    return{
        form,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        error,
        handleChange,
        submit
    }
}
