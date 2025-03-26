function NavBarButton({ children, onClick, className }) {
    return (
        <button 
        onClick={onClick}
        className={`py-1 px-4 border-2 border-white rounded-full transition hover:border-[#00316E] text-sm ${className}`}>
            {children}
        </button>
    );
}
  
export default NavBarButton;