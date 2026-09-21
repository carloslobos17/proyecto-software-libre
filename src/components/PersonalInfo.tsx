import type { UserResponse } from "../models/user";

interface PersonalInfoProps {
    user: UserResponse | null
}

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between ">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Datos personales</h2>
                    <p className="mt-1 text-sm text-slate-500">Informacion obtenida de la sesión actual </p>
                </div>
                <button
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    Editar perfil
                </button>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <label
                    htmlFor=""
                    className="text-sm font-medium text-slate-700"
                >
                    Nombre
                </label>
                <input
                    type="text"
                    readOnly
                    value={user?.name ?? ""}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-700"
                />
                <label
                    htmlFor=""
                    className="text-sm font-medium text-slate-700"
                >
                    Apellido
                </label>
                <input
                    type="text"
                    readOnly
                    value={user?.lastName ?? ""}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-700"
                />
                <label
                    htmlFor=""
                    className="text-sm font-medium text-slate-700"
                >
                    Correo electronico
                </label>
                <input
                    type="text"
                    readOnly
                    value={user?.email ?? ""}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-700"
                />
                <label
                    htmlFor=""
                    className="text-sm font-medium text-slate-700"
                >
                    Numero telefonico
                </label>
                <input
                    type="text"
                    readOnly
                    value={user?.phone ?? ""}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-700"
                />
            </div>
        </section>
    )
}