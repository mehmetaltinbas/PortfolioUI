function Introduction({ user, downloadCV }) {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-2xl font-bold text-center text-[#003366]">
                {user?.firstName} {user?.lastName}
            </p>
            <p className="text-l font-semibold text-center text-[#174978]">{user?.position}</p>
            <p className="text-center">{user?.bio}</p>
            <button
                onClick={downloadCV}
                className="py-1 px-4 border-[1px] border-gray rounded-full hover:border-black"
            >
                Download CV
            </button>
        </div>
    );
}

export default Introduction;
