function NavBarButton({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`py-1 px-4 border-[1px] border-white text-white rounded-full transition hover:border-white text-sm ${className}`}
        >
            {children}
        </button>
    );
}

export default NavBarButton;
