import ButtonSB from "./buttonSB";
import logoImage from "../../assets/logo.png";
import { FaHome, FaBook, FaStar } from 'react-icons/fa'; // Necesitarás instalar: npm install react-icons
import { useNavigate } from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();
    
    const handleClickHome = async (e) => {
        navigate('/');
    };
    const handleClickResults = async (e) => {
        navigate('/Results');
    };
    const handleClickFavorite = async (e) => {
        navigate('/Favorites');
    };
    
    return (
        <>
            {/* Sidebar */}
            <aside className={` 
                md:translate-x-0
                transform transition-transform duration-300 ease-in-out
                w-72 h-screen bg-gradient-to-b from-emerald-600 to-emerald-800 
                text-white flex flex-col p-6 shadow-xl fixed md:relative z-40
            `}>
                {/* Logo */}
                <div className="flex justify-center items-center mb-10">
                    <div className="bg-white p-3 rounded-full shadow-md">
                        <img src={logoImage} alt="Logo Recipy" className="w-24 h-24 object-contain" />
                    </div>
                </div>

                {/* Navegación */}
                <nav className="flex-1 space-y-4">
                    <ButtonSB text="Home" icon={<FaHome className="text-xl" />} onClick={handleClickHome} />
                    <ButtonSB text="Recipys" icon={<FaBook className="text-xl"/>} onClick={handleClickResults}/> 
                    <ButtonSB text="Favorites" icon={<FaStar className="text-xl"/>} onClick={handleClickFavorite}/> 
                </nav>
                
                <div className="mt-auto pt-6 border-t border-emerald-500 text-center">
                    <p className="text-emerald-200 text-sm">© 2025 Recipe App -Javier Gomez </p>
                </div>
            </aside>
        </>
    );
}