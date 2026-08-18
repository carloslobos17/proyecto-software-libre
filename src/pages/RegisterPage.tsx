import { useEffect } from "react"
import type React from "react"
import { useRegisterViewModel } from "../viewmodels/use-register"
import { toast } from "sonner"

interface RegisterPageProps {
    onNavigateToLogin: () => void
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
    onNavigateToLogin
}) => {
    const {
        form,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        error,
        handleChange,
        submit,
        success
    } = useRegisterViewModel()

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    useEffect(() => {
        if (success) {
            toast.success(success)
        }
    }, [success])
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden font-sans">
            <header className="relative w-full border border-slate-100 bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        lobosdev
                        <nav className="hidden md:flex items center gap-8 font-medium text-slate-600">
                            <a href="">Explorar</a>
                            <a href="">Ofertas</a>
                            <a href="">Historia</a>
                            <a href="">Ayuda</a>
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg"
                            onClick={onNavigateToLogin}
                        >Loguearse</button>
                    </div>
                </div>
            </header>
            <main className="flex-1 mx-w-8xl w-full mx-auto px-6 py-10 items-center justify-center">
                <div className="flex justify-center">
                    <div className="w-full max-w-lg border rounded-2xl shadow-xl p-8 sm:p-1'">
                        <div className="">
                            <h1 className="text-3xl font-black">Crear una cuenta</h1>
                            <p className="mt-2.5 text-sm font-medium">Crea tu cuenta y disfruta de tus promociones</p>
                        </div>
                        <form onSubmit={submit}>
                            <label
                                className="block text-xs font-semibold uppercase mt-4 mb-2"
                            >Nombre completo
                            </label>
                            <input type="text"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full px-4 py-3 mb-2 border border-slate-200 focus:border-indigo-500 rounded-lg placeholder-slate-400"
                                placeholder="Registra tu nombre"
                            />
                            <label
                                className="block text-xs font-semibold uppercase mt-4 mb-2"
                            >Apellido
                            </label>
                            <input type="text"
                                value={form.lastname}
                                onChange={(e) => handleChange("lastname", e.target.value)}
                                placeholder="Registra tu apellido"
                                className="w-full px-4 py-3 mb-2 border border-slate-200 focus:border-indigo-500 rounded-lg placeholder-slate-400"

                            />
                            <label
                                className="block text-xs font-semibold uppercase mb-2"
                            >Correo electronico
                            </label>
                            <input type="text"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="w-full px-4 py-3 mb-2 border border-slate-200 focus:border-indigo-500 rounded-lg placeholder-slate-400"
                                placeholder="example@gmail.com"
                            />
                            <label
                                className="block text-xs font-semibold uppercase mb-2"
                            >Telefono
                            </label>
                            <input type="text"
                                value={form.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="w-full px-4 py-3 mb-2 border border-slate-200 focus:border-indigo-500 rounded-lg placeholder-slate-400"
                                placeholder="7277-2827"
                            />
                            <div>
                                <label
                                    className="block text-xs font-semibold uppercase mb-2"
                                >Contraseña
                                </label>
                                <input type="password"
                                    value={form.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    className="w-full px-4 py-3 mb-2 border border-slate-200 focus:border-indigo-500 rounded-lg placeholder-slate-400"
                                    placeholder="Digite su contraseña"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-xs font-semibold uppercase mb-2"
                                >Contraseña
                                </label>
                                <input type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 mb-2 border border-slate-200 focus:border-indigo-500 rounded-lg placeholder-slate-400"
                                    placeholder="Digite su contraseña de confirmación"
                                />
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-800 hover:shadow-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
                                >{isLoading ? "Creando cuenta" : "Crear cuenta"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}