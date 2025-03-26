function StandardFlexContainer({ children, keyprop, dataId, onClick, className }) {
    return (
        <div 
        keyProp={keyprop}
        data-id={dataId}
        onClick={onClick}
        className={`bg-white p-6 rounded-2xl shadow-md border
        flex flex-col justify-center items-center gap-2
        transition hover:border-[#00316E] duration-300 hover:cursor-pointer
        ${className}`}>
            {children}
        </div>
    );
}
  
export default StandardFlexContainer;