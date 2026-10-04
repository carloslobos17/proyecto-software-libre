import type React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProductForm } from "../components/ProductForm";

export const ProductCreatePage: React.FC=()=>{
    const navigate = useNavigate()
    const handleSucess = ()=>{
        toast.success("Producto registrado correctamen")
    }
    return(
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-slate-800"></h2>
                <p className="mt-1 text-sm text-slate-500">Crea y administra los productos para tus clientes</p>
            </div>
            <ProductForm
            onCancel={()=>navigate("/catalog")}
            onSuccess={handleSucess}
            />
        </div>
    )
}