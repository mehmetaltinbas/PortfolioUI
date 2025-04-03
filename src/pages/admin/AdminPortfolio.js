import axios from "axios";
import { useEffect, useState } from "react";
import BodyButton from "../../components/buttons/BodyButton";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

function AdminPortfolio() {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = (await axios.get(`${process.env.REACT_APP_API_URL}project/getallbyuserid/${process.env.REACT_APP_USER_ID}`)).data;
                setProjects(projectsResponse.projects);
            } catch (error) {
                console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
            }
        };

        fetchData();
    }, []);

    function SelectProject(e) {
        e.preventDefault();
        const clickedProject = projects.find(p => p._id == e.currentTarget.dataset.id);
        setProject(clickedProject);
    }

    return (
        <div>
            {project._id ? (
                <div className="w-full flex flex-col justify-start items-center gap-4">
                        <div className="w-full flex items-center justify-start gap-4">
                            <BodyButton onClick={() => setProject({})}>←</BodyButton>
                            <p className="inline-block text-2xl font-semibold flex-1">{project.title}</p>
                            {project.repositoryLinks.map((repositoryLink) => (
                                <a href={repositoryLink} target="_blank" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-gray-800 transition duration-300 text-xl">
                                    <FaGithub />
                                </a>
                            ))}
                            {project.liveDemoLink ? (
                                <a href={project.liveDemoLink} target="_blank" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-gray-800 transition duration-300 text-lg">
                                <FaExternalLinkAlt />
                                </a>
                            ): (<></>)}
                        </div>
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        <p className="">{project.longDescription}</p>
                        <div className="w-full flex justify-start items-center gap-[10px]">
                            {project.technologies.map((technologie) => (
                                <p className="text-sm text-gray-400 whitespace-nowrap">• {technologie}</p>
                            ))}
                        </div>
                        <div className="w-full flex justify-start items-center gap-2">
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <p className="text-2xl font-bold text-center md:col-span-2 xl:col-span-3">Projects I've Built</p>
                    {projects.map((project) => (
                        <div key={project._id} data-id={project._id}>
                            <div key={project._id} data-id={project._id} onClick={SelectProject} className="bg-white p-6 rounded-2xl shadow-md border
                            flex flex-col justify-center items-center gap-2
                            transition hover:border-[#00316E] duration-300 hover:cursor-pointer">
                                <div className="w-full flex justify-between items-center gap-2">
                                    <FaFolder className="text-xl" />
                                    <div className="flex justify-end items-center gap-2">
                                        {project.repositoryLinks?.map((repositoryLink) => (
                                            <a href={repositoryLink} target="_blank" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-gray-800 transition duration-300 text-xl">
                                                <FaGithub />
                                            </a>
                                        ))}
                                        {project.liveDemoLink ? (
                                            <a href={project.liveDemoLink} target="_blank" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-gray-800 transition duration-300 text-lg">
                                            <FaExternalLinkAlt />
                                            </a>
                                        ): (<></>)}
                                    </div>
                                </div>
                                <p className="text-lg font-semibold">{project.title}</p>
                                <p className="text-gray-600">{project.shortDescription}</p>
                                <div className="w-full flex items-center gap-[10px] overflow-x-auto">
                                    {project.technologies.map((technologie) => (
                                        <p className="text-xs text-gray-600 font-medim whitespace-nowrap">• {technologie}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminPortfolio;