import type React from "react";
import { Drawer } from "../components/Drawer";
import { useState } from "react";
import { Menu } from "lucide-react";
export const DashboardPage: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <div className="min-h-screen bg-slate-50">
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
            <main className="md:ml-0">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
                    <button
                        type="button"
                        onClick={()=>setIsDrawerOpen(true)}
                        className="m-4 rounded-lg border-slate-200 p-2 text-slate-700 md:hidden"
                        aria-label="Abrir menu"
                    >
                        <Menu size={20} />
                    </button>
                </header>
            </main>
        </div>
    )
}