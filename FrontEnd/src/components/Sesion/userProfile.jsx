import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el dropdown está abierto
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref para el contenedor del dropdown

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }

        // Función para cerrar el dropdown si se hace clic fuera de él
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
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

    if (!user) return null;

    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : '?';

    return (
        <div className="relative" ref={dropdownRef}> {/* Asigna la ref al contenedor principal */}
            <div
                className="w-15 h-15 rounded-full bg-gradient-to-br from-[#F18F01] to-[#50B88C] flex items-center justify-center cursor-pointer shadow-md transform transition-transform duration-200 hover:scale-105"
                onClick={() => setIsOpen(!isOpen)} // Cambia el estado al hacer clic
            >
                <span className="text-white font-semibold text-sm">{initials}</span>
            </div>

            {/* Dropdown con información del usuario */}
            <div
                className={`absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl py-2 z-50 transition-all duration-300 ease-out transform ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`} // Controla la visibilidad y la animación
            >
                <div className="px-5 py-3 border-b border-gray-100">
                    <p className="text-md font-bold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-5 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 rounded-b-xl"
                >
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default UserProfile;