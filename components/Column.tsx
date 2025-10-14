function Column({children}: {children: React.ReactNode}) {
    return (
        <div className="flex-1 flex-column border justify-items-center">
            {children}
        </div>
    )
};

export default Column;