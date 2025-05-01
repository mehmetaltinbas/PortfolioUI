import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../../components/sections/admin/ProjectCard.js';
import ProjectDetail from '../../components/sections/admin/ProjectDetails.js';
import ProjectCreateForm from '../../components/sections/admin/ProjectCreateForm.js';

function AdminPortfolio() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({
        _id: '',
    });
    const [isProjectCreateFormHidden, setIsProjectCreateFormHidden] =
        useState(true);

    const fetchProjectsData = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}project/getallbyuserid/${process.env.REACT_APP_USER_ID}`
        );
        setProjects(response.data.projects);
    };

    useEffect(() => {
        fetchProjectsData();
    }, []);

    async function selectProject(e, project) {
        e.preventDefault();
        setSelectedProject(project);
    }

    async function toggleProjectCreateForm(e) {
        e.preventDefault();
        const projectCreateForm = document.getElementById('projectCreateForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = projectCreateForm.getBoundingClientRect();
        setIsProjectCreateFormHidden((prev) => !prev);
        projectCreateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        projectCreateForm.style.left = `${buttonRect.left + buttonRect.width / 2 + window.scrollX - formRect.width / 2}px`;
    }

    return (
        <div>
            {selectedProject?._id ? (
                <ProjectDetail
                    key={projects}
                    fetchProjectsData={fetchProjectsData}
                    onBack={setSelectedProject}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                />
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <div className="flex justify-center items-center gap-2 md:col-span-2 xl:col-span-3">
                        <p className="text-2xl font-bold text-center">
                            Portfolio
                        </p>
                        <button
                            onClick={toggleProjectCreateForm}
                            className="text-2xl text-blue-400"
                        >
                            +
                        </button>
                    </div>
                    {projects.map((project) => (
                        <ProjectCard
                            project={project}
                            onSelectProject={selectProject}
                            onDeleteProject={() => {}}
                        />
                    ))}
                </div>
            )}

            <ProjectCreateForm
                isHidden={isProjectCreateFormHidden}
                fetchProjectsData={fetchProjectsData}
                toggleForm={toggleProjectCreateForm}
            />
        </div>
    );
}

export default AdminPortfolio;
