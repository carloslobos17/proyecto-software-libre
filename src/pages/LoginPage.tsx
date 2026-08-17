import type React from "react";
import { useLoginViewModel } from "../viewmodels/use-login";

interface LoginPageProps {
    onNavigateToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
    onNavigateToRegister,
}) => {
    const {
        email,
        password,
        setEmail,
        setPassword,
        isLoading,
        error,
        submit
    } = useLoginViewModel()
    return (
        <div className="min-h-screen flex flex-col bg.white">
            <header className="relative w-full border border-slate-100 bg-white/80">


                <div className="max-w-7xl mc-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <span className="font-bold text-slate-950">Faster Delivery</span>
                        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                            <a className="hover:text-indigo-600 transition-colors" href="#">Explorar</a>
                            <a className="hover:text-indigo-600 transition-colors" href="#">Ofertas</a>
                            <a className="hover:text-indigo-600 transition-colors" href="#">Historia</a>
                            <a className="hover:text-indigo-600 transition-colors" href="#">Ayuda</a>
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg"
                            onClick={onNavigateToRegister}
                        >Registrarse
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-slate-900">Bienvenido</h2>
                        <p className="mt-2 text-sm">Crear nueva cuenta</p>
                    </div>
                    <form 
                    onSubmit={submit}>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-slate-400 rounded-lg"
                            placeholder="Usuario o correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="w-full px-4 py-3 my-2 border border-slate-400 rounded-lg"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="mb-4 flex items-center justify-between">
                            <label
                                htmlFor=""
                                className="flex items-center gap-2 cursor-pointer select-none"
                            >

                                <input type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300"
                                />
                                <span className="text-sm">Recuerdame</span>
                            </label>
                            <a
                                href=""
                                className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                            >Olvide la contraseña
                            </a>
                        </div>
                        <div>
                            <p className="mb-3 text-sm text-red-500">{error}</p>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-blue-800 rounded-lg text-white hover:bg-blue-800 hover:shadow-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
                            >
                                {isLoading ? "Ingresando al sistema..." : "Loguearse"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}