import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import BodyButton from '../../buttons/BodyButton.js';

function ProjectDetail({ project, onBack }) {
    return (
        <div className="w-full flex flex-col justify-start items-center gap-4">
            <div className="w-full flex items-center justify-start gap-4">
                <BodyButton onClick={onBack}>←</BodyButton>
                <p className="inline-block text-2xl font-semibold flex-1">
                    {project.title}
                </p>
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
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <p>{project.longDescription}</p>
                <div className="w-full flex justify-start items-center gap-[10px]">
                    {project.projectSkills.map((projectSkill) => (
                        <p
                            key={projectSkill.name}
                            className="text-sm text-gray-400 whitespace-nowrap"
                        >
                            • {projectSkill.name}
                        </p>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
                    {project.projectPhotos?.map((photo) => (
                        <div>
                            <img
                                key={photo._id}
                                src={photo.value}
                                className="w-[300px] h-[300px] object-cover rounded-[10px]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
