import SideBar from "../components/SideBar/SideBar"
import { useEffect,useState } from "react";


export default function Favorites() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        // Comprobar si el usuario está logueado
            const userInfo = localStorage.getItem('userInfo');
            setIsLoggedIn(!!userInfo);
        }, []);
    return (
        <div className="flex h-screen">
            {/* Barra lateral responsiva */}
            <aside>
                <SideBar />
            </aside>
            {isLoggedIn && (
                
                    
                    <div className="flex-1 bg-gradient-to-br from-amber-100 to-amber-200 p-4 flex justify-center items-center relative overflow-hidden">
                        <h1 className="text-3xl font-bold">Tus Favoritos</h1>
                    </div>
                
            )}
            {!isLoggedIn && (
                <div className="flex-1 bg-gradient-to-br from-amber-100 to-amber-200 p-4 flex justify-center items-center relative overflow-hidden">
                    <h1 className="text-3xl font-bold">Inicia sesión para ver tus favoritos</h1>
                </div>
            )}
        </div>
    );
}