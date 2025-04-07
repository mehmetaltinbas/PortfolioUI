import axios from "axios";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/sections/visitor/ProjectCard";
import ProjectDetail
 from "../../components/sections/visitor/ProjectDetail";

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [loading, setLoading] = useState(true);


    const fetchProjectsData = async () => {
        try {
            const projectsResponse = (await axios.get(`${process.env.REACT_APP_API_URL}project/getallbyuserid/${process.env.REACT_APP_USER_ID}`)).data;
            setProjects(projectsResponse.projects);
        } catch (error) {
            console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProjectsData();
    }, []);


    const selectProject = (e, projectId) => {
        e.preventDefault();
        const clickedProject = projects.find(p => p._id === projectId);
        setSelectedProject(clickedProject);
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center text-xl font-bold">
                Loading...
            </div>
        )
    }

    return (
        <div>
            {selectedProject?._id ? (
                <ProjectDetail project={selectedProject} onBack={() => setSelectedProject({})} />
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <p className="text-2xl font-bold text-center md:col-span-2 xl:col-span-3">Projects I've Built</p>
                    {projects.map((project) => (
                        <div key={project._id} data-id={project._id}>
                            <ProjectCard project={project} onClick={(e) => selectProject(e, project._id)} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Portfolio;