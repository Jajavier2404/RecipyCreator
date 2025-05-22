import ButtonSB from "./buttonSB";
import logoImage from "../../assets/logo.png";
import { FaHome, FaBook, FaStar, FaBars, FaTimes, FaLeaf, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function SideBar() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const sidebarRef = useRef(null);
    const userMenuRef = useRef(null);

    const handleClickHome = async (e) => {
        navigate('/');
    };
    const handleClickResults = async (e) => {
        navigate('/Results');
    };
    const handleClickFavorite = async (e) => {
        navigate('/Favorites');
    };

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    // Efecto para cargar información del usuario y manejar clicks fuera
    useEffect(() => {

        //traer del localStorage la info del usuario
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }

        // Función para cerrar el sidebar
        const handleClickOutside = (event) => {
            // Cerrar sidebar si se hace click fuera
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
                !event.target.closest('.sidebar-toggle-btn')) {
                setIsVisible(false);
            }
            // Cerrar menú de usuario si se hace click fuera
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // Generar iniciales del usuario
    const getUserInitials = () => {
        if (!user || !user.name) return '?';
        return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <>
            {/* Toggle Sidebar Button */}
            <button 
                onClick={toggleSidebar}
                className="sidebar-toggle-btn fixed top-4 left-4 z-50 bg-[#50B88C] text-white p-2 rounded-full shadow-md hover:bg-[#3D9B75] transition-colors duration-300"
            >
                {isVisible ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>

            {/* Sidebar */}
            <aside 
                ref={sidebarRef}
                className={`
                    fixed top-0 left-0 bottom-0
                    w-72 bg-[#295F4E]
                    text-white flex flex-col p-6 shadow-xl z-40
                    transform transition-transform duration-300 ease-in-out
                    ${isVisible ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Header con logo */}
                <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-[#50B88C]/30">
                    <div className="flex items-center gap-3 font-moodcake text-3xl text-white">
                        <FaLeaf className="text-[#F18F01] text-2xl" />
                        <h2 className="bg-gradient-to-r from-[#F18F01] to-[#ffd484] bg-clip-text text-transparent font-bold">Ecorecipe</h2>
                    </div>
                    <p className="text-xs text-gray-300 mt-2 font-light">Tu compañero culinario sostenible</p>
                </div>

                {/* Navegación */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#50B88C]/50">
                    <div className="mb-6 px-2">
                        <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">Navegación principal</h3>
                        <ButtonSB text="Home" icon={<FaHome className="text-xl" />} onClick={handleClickHome} />
                        <ButtonSB text="Recipys" icon={<FaBook className="text-xl"/>} onClick={handleClickResults}/>
                        <ButtonSB text="Favorites" icon={<FaStar className="text-xl"/>} onClick={handleClickFavorite}/>
                    </div>
                </nav>

                {/* Sección del Usuario */}
                {user && (
                    <div className="relative px-4 py-4" ref={userMenuRef}>
                        <div className="border-t border-[#50B88C]/30 pt-4">
                            <h3 className="text-xs uppercase tracking-wider text-center text-gray-400 font-semibold mb-3">Perfil de Usuario</h3>
                            <div 
                                className="flex items-center gap-3 p-3 rounded-lg bg-[#3D7A5E]/30 hover:bg-[#3D7A5E]/50 cursor-pointer transition-all duration-200 group"
                                onClick={toggleUserMenu}
                            >
                                {/* Avatar con iniciales */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F18F01] to-[#50B88C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                                    <span className="text-white font-semibold text-sm">{getUserInitials()}</span>
                                </div>
                                
                                {/* Información del usuario */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                    <p className="text-xs text-gray-300 truncate">{user.email}</p>
                                </div>
                                
                                {/* Icono de usuario */}
                                <FaUser className="text-gray-400 text-sm group-hover:text-[#F18F01] transition-colors duration-200" />
                            </div>

                            {/* Menú desplegable del usuario */}
                            <div className={`
                                absolute bottom-full left-4 right-4 mb-2
                                bg-white rounded-lg shadow-xl py-2 z-50
                                transition-all duration-300 ease-out transform
                                ${isUserMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                            `}>
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 text-sm rounded-b-lg"
                                >
                                    <FaSignOutAlt className="mr-3 text-sm" />
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-auto pt-6 border-t border-[#50B88C]/50 text-center">
                    <p className="text-[#F18F01] text-sm">© 2025 Recipe App -Javier Gomez </p>
                </div>
            </aside>
        </>
    );
}