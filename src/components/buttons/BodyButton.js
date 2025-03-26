function BodyButton({ children, onClick, className }) {
    return (
        <button 
        onClick={onClick}
        className={`py-1 px-4 border-[1px] border-gray rounded-full 
        hover:border-black ${className}`}>
            {children}
        </button>
    );
}
  
export default BodyButton;