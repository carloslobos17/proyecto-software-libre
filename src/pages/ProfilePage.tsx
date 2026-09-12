import { ArrowLeft, Mail, Phone, UserRound } from "lucide-react"
import { useAuth } from "../context/useAuth"

interface ProfilePageProps {
    onBackToDashboard: () => void
}

export const ProfilePage = ({ onBackToDashboard }: ProfilePageProps) => {
    const { user } = useAuth()
    const fullName = `${user?.name ?? ""} ${user?.lastName}`.trim()
    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="mx-auto max-w-6xl">
                <button
                    type="button"
                    className="mb-5 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
                >
                    <ArrowLeft />
                    Volver al dashboard
                </button>
                <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                                <UserRound size={32} />
                            </div>
                            <div className="text-2xl font-bold text-slate-800">
                                <h1>{fullName || "Usuario"}</h1>
                            </div>
                            <div className="mt-2 flex flex-col gap-1 text-sm text-slate-500 sm:flex-row">
                                <span className="flex items-center gap-1">
                                    <Mail size={14}/>
                                    {user?.email ?? "Correo no disponible"}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Phone size={14}/>
                                    {user?.phone ?? "Telefono no disponible"}
                                </span>
                            </div>
                        </div>
                        <button
                        type="button"
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            Compartir
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
} 