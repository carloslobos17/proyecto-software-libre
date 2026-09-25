interface CategoryFormProps{
    onCancel:()=>void
}

export const CategoryForm = ({onCancel}:CategoryFormProps) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Gestion de categorias</h2>
                <p className="mt-1 text-sm text-slate-500">Administra, define y segmenta las opciones de productos para tus restaurantes y clientes</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden max-w-4xl">
                <div className="border-b border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800">Crear categoria</h3>
                    <p className="text-xs text-slate-400 mt-1">Define los datos principales de la nueva seccion</p>
                </div>
                <form className="p-6 space-y-6" action="">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2" htmlFor="">
                            Nombre de la categoria
                        </label>
                        <input type="text"
                            required
                            placeholder="Ej. Pizaas artesanales"
                            className="w-full rounded-lg border border-slate-200 py-3 px-4 text-xs placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2" htmlFor="">
                            Descripcion
                        </label>
                        <textarea
                            required
                            placeholder="Describe los productos incluidos en esta categoria"
                            className="w-full h-32 rounded-lg border border-slate-200 py-3 px-4 text-xs placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                        />
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
                        Crear carpeta
                    </button>
                    </div>

                </form>
            </div>
        </div>
    )
}