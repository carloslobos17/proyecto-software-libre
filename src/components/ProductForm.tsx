import React, { useState } from "react"

interface ProductFormProps {
    onCancel: () => void
    onSuccess: () => void
}

const availablesCategories = [
    "Fast Food",
    "Healthy"
]

export const ProductForm: React.FC<ProductFormProps> = ({
    onCancel,
    onSuccess
}) => {
    const [category, setCategory] = useState()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("producto creado");
        if (onSuccess) onSuccess()
    }
    return (
        <div className="max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800">Crear nuevo producto</h3>
                <p className="text-xs text-slate-400 mt-1">Ingresa los datos esenciales del producto para registrarlo en el catalogo]]]]</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2" htmlFor="">
                        Nombre del producto
                    </label>
                    <input type="text"
                        required
                        placeholder="Ej. Hamburguesa doble carne"
                        className="w-full rounded-lg border border-slate-200 py-3 px-4 text-xs placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2" htmlFor="">
                        categoria
                    </label>
                    <select
                        required
                        value={category}
                        className="w-full rounded-lg border border-slate-200 py-3 px-4 text-xs text-slate-700 focus:border-indigo-600 focus:outline-none"
                    >
                        {availablesCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2" htmlFor="">
                        Codigo de barras
                    </label>
                    <input type="text"
                        required
                        placeholder="Ej. 75645745745"
                        className="w-full rounded-lg border border-slate-200 py-3 px-4 text-xs placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">Codigo interno de inventario</span>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2" htmlFor="">
                        Descripcion
                    </label>
                    <textarea
                        required
                        placeholder="Describe la presentacion y notas de preparacion"
                        className="w-full h-32 rounded-lg border border-slate-200 py-3 px-4 text-xs placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">Asegurate de incluir advertencias o especificacion de porciones para los repartidores</span>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                    <button
                        onClick={onCancel}
                        className="rounded-lg bg-slate-100 hover:bg-slate-200 px-5 py-2 text-xs font-semibold text-slate-600"
                    >
                        Cancelar
                    </button>

                    <button
                        className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-xs font-semibold text-white">
                        Crear producto
                    </button>
                </div>
            </form>
        </div>
    )
}
