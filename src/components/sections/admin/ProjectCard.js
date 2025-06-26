import { FaFolder } from 'react-icons/fa';
import axios from 'axios';

function PojectCard({ project, onSelectProject, dragStart, dragOver, drop }) {

    function handleCardClick(e) {
        e.stopPropagation();
        onSelectProject(e, project);
    }

    async function onDeleteProject(e, id) {
        e.stopPropagation();
        const response = await (axios.delete(`${process.env.REACT_APP_API_URL}project/delete/${id}`,
            {
                withCredentials: true
            }
        )).data
        alert(response.message);
    }

    return (
        <div
            key={project._id}
            data-id={project._id}
            onClick={handleCardClick}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDrop={drop}
            draggable='true'
            className="w-[200px] h-[200px] bg-white p-6 rounded-2xl shadow-md border
        flex flex-col justify-around items-center gap-2
        transition hover:border-[#00316E] duration-300 hover:cursor-pointer"
        >
            <div className="w-full flex flex-col justify-center items-center gap-2">
                <div className="w-full flex justify-between items-center">
                    <FaFolder className="text-xl" />
                </div>
                <p className="text-lg font-semibold">{project.title}</p>
                <form onSubmit={(e) => onDeleteProject(e, project._id)}>
                    <button
                        type="submit"
                        onClick={(e) => e.stopPropagation()}
                        className="border rounded-full px-2 py-2 text-red-400"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PojectCard;
