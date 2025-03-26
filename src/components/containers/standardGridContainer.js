function StandardGridContainer({ children, keyProp, dataId, onClick, className }) {
    return (
        <div 
        keyProp={keyProp}
        data-id={dataId}
        onClick={onClick}
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ${className}`}>
            {children}
        </div>
    );
}
  
export default StandardGridContainer;