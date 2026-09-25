import React from "react";
import { LayoutGrid, Pizza, Salad, Cake, Coffee, FolderPlus } from "lucide-react";

interface DrawerProps {
    isOpen: boolean
    onClose: () => void
    currentTab:string
    onSelectTab:(Tab:string)=>void
}

const menuItems = [
    { label: "All categorias", icon: LayoutGrid },
    { label: "Fast Food", icon: Pizza },
    { label: "Healty", icon: Salad },
    { label: "Desserts", icon: Cake },
    { label: "Beverages", icon:  Coffee },

]

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    currentTab,
    onSelectTab
}) => {
    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Cerrar menu"
                    onClick={onClose}
                    className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
                />
            )}
            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition transition-transform duration-300 md:static md:z-auto md:block md:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
                    <div>
                        <p className="text-xs font-semibold text-slate-400">Delivery</p>
                        <h2 className="text-lg"></h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 md:hidden"
                    >
                        x
                    </button>
                </div>
                <nav className="p-4 space-y-4">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase text-slate-400">Gestion</p>
                        <button
                        type="button"
                        onClick={()=>{
                            onSelectTab("categories-form")
                            onClose()
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                            currentTab ==="categories-form"
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                        >
                            <FolderPlus size={18}/>
                            Crear categoria
                        </button>
                    </div>
                    <p className="mb-3 text-xs font-bold uppercase text-slate-400">Filters</p>
                    <ul className="space-y-2">
                        {menuItems.map((item, index) =>{
                            const Icon = item.icon
                            return(
                            <li key={item.label}>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors
                                ${index === 0
                                            ? "bg-cyan-100 font-semibold text-700"
                                            : "text-slate-600 hover:bg-slate-100"
                                        }
                                `}
                                >
                                    <Icon size={18}/>
                                    {item.label}
                                </button>
                            </li>
                            )

                        })}
                    </ul>
                </nav>
            </aside>
        </>
    )
}