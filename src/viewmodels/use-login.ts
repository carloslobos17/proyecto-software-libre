import { useState } from "react";
import { loginUser } from "../service/user-service";


export function useLoginViewModel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    console.log("VALOR EMAIL", email)
    console.log("VALOR PASSWORD", password)
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Completa correo y contraseña")
            return
        }
        setIsLoading(true)

        try {
            const data = await loginUser({ email, password })
            console.log("TOKEN", data.token)
        } catch (error) {
            console.log("ERROR", error);
        }
    }

    return {
        email,
        password,
        setEmail,
        setPassword,
        isLoading,
        error,
        submit
    }

}