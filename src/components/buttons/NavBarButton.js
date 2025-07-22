function NavBarButton({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`py-1 px-4 text-white rounded-full transition text-sm 
                transition duration-250 hover:text-gray-400 ${className}`}
        >
            {children}
        </button>
    );
}

export default NavBarButton;
