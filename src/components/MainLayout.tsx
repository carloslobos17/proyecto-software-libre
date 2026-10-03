import type React from "react";
import { useAuth } from "../context/useAuth";
import { Outlet, useNavigate } from "react-router-dom"
import { useState } from "react";
import { Menu, UserRound } from "lucide-react";
import { products } from "../data/products";
import { CategoryForm } from "./CategoryForm";
import { Drawer } from "./Drawer";
import { ProductCard } from "./ProductCard";

export const MainLayout: React.FC = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
            <main className="min-w-0 flex-1">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
                    <button
                        type="button"
                        onClick={() => setIsDrawerOpen(true)}
                        className="m-4 rounded-lg border-slate-200 p-2 text-slate-700 md:hidden"
                        aria-label="Abrir menu"
                    >
                        <Menu size={20} />
                    </button>
                    <h1 className="text-xl font-semibold text-slate-800">
                        Fast Delivery
                    </h1>
                    <div className="flex items-center gap">
                        <button
                            type="button"
                            onClick={()=>("/profile")}
                            className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                        >
                            <UserRound size={17} />
                            <span>
                                {user?.name ?? "Mi perfil"}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={logout}
                            className="rounded-lg bg-red-400 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            Cerrar sesión
                        </button>
                    </div>

                </header>
                <div className="flex-1 p-6">
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}