import SideBar from "../components/SideBar/SideBar"
export default function Favorites() {
    return (
        <div className="flex h-screen">
            {/* Barra lateral responsiva */}
            <aside>
                <SideBar />
            </aside>

            {/* Contenido principal con fondo mejorado */}
            <main className="flex-1 bg-gradient-to-br from-amber-100 to-amber-200 p-4 flex justify-center items-center relative overflow-hidden">
                <h1 className="text-3xl font-bold">favoritos</h1>
            </main>
        </div>
    );
}