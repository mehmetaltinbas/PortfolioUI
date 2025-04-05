

function Introduction({ user, downloadCV}) {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-2xl font-bold text-center">{user.firstName} {user.lastName}</p>
            <p>{user.position}</p>
            <p>{user.bio}</p>
            <button onClick={downloadCV}
            className="py-1 px-4 border-[1px] border-gray rounded-full hover:border-black">
                Download CV
            </button>
        </div>
    );
}

export default Introduction;