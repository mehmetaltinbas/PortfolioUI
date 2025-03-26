import axios from "axios";
import { useEffect, useState } from "react";
import StandardFlexContainer from "../../components/containers/standardFlexContainer";
import StandardGridContainer from "../../components/containers/standardGridContainer";
import BodyButton from "../../components/buttons/BodyButton";

function Portfolio() {
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
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-full flex items-center justify-between mb-2">
                        <BodyButton onClick={() => setProject({})}>←</BodyButton>
                        <div className="flex-1"></div> 
                        <p className="text-2xl font-bold text-center flex-1">{project.title}</p>
                        <div className="flex-1"></div>
                        <button className="invisible py-1 px-4 border-[1px] border-gray rounded-full 
                        hover:border-black">←</button>
                    </div>
                    <p className="text-gray-600 text-center">{project.description}</p>
                    {project.repositoryLinks.map((repositoryLink) => (
                        <a href={repositoryLink} target="_blank" className="text-blue-800 hover:text-purple-800 underline">{repositoryLink}</a>
                    ))}
                    <a href={project.liveDemoLink} target="_blank" className="text-blue-800 hover:text-purple-800 underline">{project.liveDemoLink}</a>
                    <StandardGridContainer className="gap-[10px]">
                        <p className="col-span-1 md:col-span-2 xl:col-span-3 text-center text-lg font-semibold">Technologies</p>
                        {project.technologies.map((technologie) => (
                            <p className="">{technologie}</p>
                        ))}
                    </StandardGridContainer>
                </div>
            ) : (
                <StandardGridContainer className="gap-2">
                    {projects.map((project) => (
                        <div key={project._id} data-id={project._id}>
                        <StandardFlexContainer keyprop={project._id} dataId={project._id} onClick={SelectProject}>
                            <p className="text-lg font-semibold">{project.title}</p>
                            <p className="text-gray-600">{project.description}</p>
                        </StandardFlexContainer>
                        </div>
                    ))}
                </StandardGridContainer>
            )}
        </div>
    );
}

export default Portfolio;