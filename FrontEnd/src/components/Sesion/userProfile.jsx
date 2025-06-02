import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaStar, FaBars, FaTimes, FaLeaf, FaSignOutAlt, FaUser } from 'react-icons/fa';


const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el dropdown está abierto
  const dropdownRef = useRef(null); // Ref para el contenedor del dropdown
  

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setUser(parsedUser);
    }
    setIsLoading(false); // Marcamos que ya terminó de cargar

    // Función para cerrar el dropdown si se hace clic fuera de él
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Si está cargando o no hay usuario, no renderizar nada
  if (isLoading || !user) return null;

  // Como ya sabemos que el usuario tiene la propiedad 'name', la usamos directamente
  const userName = user.name || user.email?.split("@")[0] || "Usuario";

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "??";

    return (
        <div className="fixed top-4 right-10 z-50" ref={dropdownRef}>
            {/* Contenedor principal con posición fija y sticky */}
            <div 
                className="flex items-center gap-3 p-3 rounded-lg bg-[#3D7A5E] hover:bg-[#295F4E] cursor-pointer transition-all duration-200 group"
            >
                {/* Información del usuario */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                    <p className="text-xs text-gray-300 truncate">{user.email}</p>
                                </div>
                                
                                {/* Icono de usuario */}
                                <FaUser className="text-gray-400 text-sm group-hover:text-[#F18F01] transition-colors duration-200" />
                <div
                    className="w-15 h-15 rounded-full bg-gradient-to-br from-[#F18F01] to-[#50B88C] flex items-center justify-center cursor-pointer shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                    onClick={() => setIsOpen(!isOpen)} // Cambia el estado al hacer clic
                >
                    <span className="text-white font-semibold text-[20px]">{initials}</span>
                    
                </div>
            </div>
            {/* Dropdown con información del usuario */}
            <div
                className={`absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl py-2 z-50 transition-all duration-300 ease-out transform border border-gray-100 ${
                isOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`} // Controla la visibilidad y la animación
            >
                <button
                onClick={handleLogout}
                className="flex items-center w-full  px-6 py-4 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 rounded-b-xl group"
                >
                    <FaSignOutAlt className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">Cerrar sesión</span>
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
