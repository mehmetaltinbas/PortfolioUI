import { FaGithub, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';

function ProjectCard({ project, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white p-6 rounded-2xl shadow-md border flex flex-col justify-center items-center gap-2 transition hover:border-[#00316E] duration-300 hover:cursor-pointer"
        >
            <div className="w-full flex justify-between items-center gap-2">
                <FaFolder className="text-xl" />
                <div className="flex justify-end items-center gap-2">
                    {project.projectLinks?.map(
                        (projectLink) =>
                            projectLink.type === 'github' && (
                                <a
                                    key={projectLink.name}
                                    href={projectLink.name}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-gray-400 hover:text-gray-800 transition duration-300 text-xl"
                                >
                                    <FaGithub />
                                </a>
                            )
                    )}
                    {project.projectLinks?.map(
                        (projectLink) =>
                            projectLink.type === 'liveDemo' && (
                                <a
                                    key={projectLink.name}
                                    href={project.liveDemoLink}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-gray-400 hover:text-gray-800 transition duration-300 text-lg"
                                >
                                    <FaExternalLinkAlt />
                                </a>
                            )
                    )}
                </div>
            </div>
            <p className="text-lg font-semibold">{project.title}</p>
            <p className="text-gray-600">{project.shortDescription}</p>
            <div className="w-full flex items-center gap-[10px] overflow-x-auto">
                {project.projectSkills.map((projectSkill) => (
                    <p
                        key={projectSkill.name}
                        className="text-xs text-gray-600 font-medim whitespace-nowrap"
                    >
                        • {projectSkill.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default ProjectCard;
