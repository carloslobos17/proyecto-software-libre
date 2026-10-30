import React from "react";
import { Cake, Coffee, FolderPlus, Icon, LayoutGrid, Loader2, PackagePlus, Pizza, Salad, Tag } from "lucide-react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCategoriesList, useCategoryViewModel } from "../viewmodels/use-category";

interface DrawerProps {
    isOpen: boolean
    onClose: () => void
    selectedCategoryId?: number | string | null
    onSelectedCategory?: (id: number | string | null) => void
}
const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.includes("pizza") || lower.includes("fast") || lower.includes("comida")) return Pizza
  if (lower.includes("salad") || lower.includes("healthy") || lower.includes("saludable")) return Salad
  if (lower.includes("cake") || lower.includes("dessert") || lower.includes("postre") || lower.includes("dulce")) return Cake
  if (lower.includes("coffee") || lower.includes("beverage") || lower.includes("bebida") || lower.includes("cafe")) return Coffee
  return Tag
}

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    selectedCategoryId = null,
    onSelectedCategory
}) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const currentCategoryId = searchParams.get('categoryId')
    const { categories, isLoading, error } = useCategoriesList()

    const handleSelectCategory = (categoryId: number | string | null) => {
        if (categoryId === null) {
            navigate("/catalog")
        } else {
            navigate(`/catalog?categoryId=${categoryId}`)
        }
    }
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
                        <NavLink
                            to="/categories/create"
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex mb-2 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${isActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`
                            }
                        >
                            <FolderPlus size={18} />
                            Crear categoria
                        </NavLink>
                        <NavLink
                            to="/products/create"
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${isActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`
                            }
                        >
                            <PackagePlus size={18} />
                            Crear producto
                        </NavLink>
                    </div>
                    <p className="mb-3 text-xs font-bold uppercase text-slate-400">Filters</p>
                    <div>
                    <ul className="space-y-1">
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSelectCategory(1)}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${selectedCategoryId === null
                                        ? "bg-cyan-100 font-semibold text-cyan-700"
                                        : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                <LayoutGrid size={18} />
                                All categories
                            </button>
                        </li>

                        {isLoading && (
                            <li className="flex items-center gap-2 px-3 py-3 text-xs text-slate-400">
                                <Loader2 className="animate-spin" size={16} />
                                Cargando categorías...
                            </li>
                        )}

                        {error && !isLoading && (
                            <li className="px-3 py-2 text-xs text-red-500">
                                {error}
                            </li>
                        )}
                        {!isLoading && !error && categories.map((category) => {
                            const Icon = getCategoryIcon(category.name)
                            const isSelected = currentCategoryId === String(category.id)
                            return (
                                <li key={category.id}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectCategory(category.id)}
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${isSelected
                                                ? "bg-cyan-100 font-semibold text-cyan-700"
                                                : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span className="truncate">{category.name}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    </div>

            
                {/* <ul className="space-y-2">
                        {isLoading ? (
                            <li className="px-3 py-2 text-xs">Cargando categorias</li>
                        ) : (

                            categories.map((item, index) => {

                                return (
                                    <li key={item.id}>
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
                                            {item.name}
                                        </button>
                                    </li>
                                )
                            })

                        )}
                    </ul> */}
            </nav>
        </aside >
        </>
    )
}