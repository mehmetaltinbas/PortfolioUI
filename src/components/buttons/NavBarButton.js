function NavBarButton({ children, onClick, className }) {
    return (
        <button 
        onClick={onClick}
        className={`py-1 px-4 border-2 border-gray-700 text-white rounded-full transition hover:border-white text-sm ${className}`}>
            {children}
        </button>
    );
}
  
export default NavBarButton;