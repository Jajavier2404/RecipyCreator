import ButtonSB from "./buttonSB";
import logoImage from "../../assets/logo.png";
import { FaHome, FaBook, FaStar, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

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

    return (
        <>
            {/* Toggle Sidebar Button */}
            <button 
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 bg-[#50B88C] text-white p-2 rounded-full shadow-md hover:bg-[#3D9B75] transition-colors duration-300"
            >
                {isVisible ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 bottom-0
                w-72 bg-[#295F4E]
                text-white flex flex-col p-6 shadow-xl z-40
                transform transition-transform duration-300 ease-in-out
                ${isVisible ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className="flex justify-center items-center font-moodcake text-3xl mt-13 text-[#F18F01] bg-[#ffd484] rounded-2xl p-3  mb-5">
                    <h2>Ecorecipe</h2>
                </div>

                {/* Navegación */}
                <nav className="flex-1 space-y-4">
                    <ButtonSB text="Home" icon={<FaHome className="text-xl" />} onClick={handleClickHome} />
                    <ButtonSB text="Recipys" icon={<FaBook className="text-xl"/>} onClick={handleClickResults}/>
                    <ButtonSB text="Favorites" icon={<FaStar className="text-xl"/>} onClick={handleClickFavorite}/>
                </nav>

                <div className="mt-auto pt-6 border-t border-[#50B88C]/50 text-center">
                    <p className="text-[#F18F01] text-sm">© 2025 Recipe App -Javier Gomez </p>
                </div>
            </aside>
        </>
    );
}