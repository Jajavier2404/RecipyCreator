export default function ButtonSS({text ,onClick}) {
    var stylesLogin = false;
    if(text === "Login"){
        stylesLogin = true;
    }
    const styles = stylesLogin ? `top-5 right-70 rounded-full bg-none text-[#295F4E] hover:bg-[#333]/10 `: `top-5 right-20 rounded-full bg-[#3D9B75] text-white hover:bg-[#3D9B75]/40`;

    return (
        <div>
            <button onClick={onClick} className={`fixed z-50 ${styles} p-4 pl-15 pr-15  cursor-pointer font-bold transition-colors duration-500 `}>{text}</button>
        </div>
    );
}