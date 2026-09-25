import type React from "react";
import { Drawer } from "../components/Drawer";
import { useState } from "react";
import { Menu, UserRound } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { CategoryForm } from "../components/CategoryForm";
interface DashboardPageProps {
    onNavigateToProfile: () => void
}
export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateToProfile }) => {
    const { logout, user } = useAuth()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<string>("all")
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                currentTab="{activeTab}"
                onSelectTab={(tab) => setActiveTab(tab)}
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
                        Catalogo de productos
                    </h1>
                    <div className="flex items-center gap">
                        <button
                            type="button"
                            onClick={onNavigateToProfile}
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
                <section
                    className="p-6"
                >
                    {activeTab === "categories-form" ? (
                        <CategoryForm onCancel={()=>setActiveTab("all")}/>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-normal font-black text-slate-900">
                                    Comida lista para entregar a la puerta de tu casa
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Descrubre los mejores productos para ti, {" "}
                                    {user?.name}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}

                </section>
            </main>
        </div>
    )
}