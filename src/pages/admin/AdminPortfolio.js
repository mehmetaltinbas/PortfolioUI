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
    const [isProjectSkilDeleted, setIsProjectSkillDeleted] = useState(false);
    const [isProjectSkillCreated, setIsProjectSkillCreated] = useState(false);

    const fetchProjectsData = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}project/getallbyuserid/${process.env.REACT_APP_USER_ID}`
        );
        setProjects(response.data.projects);
    };

    useEffect(() => {
        fetchProjectsData();
    }, [isProjectSkilDeleted, isProjectSkillCreated]);

    useEffect(() => {
        if (isProjectSkilDeleted || isProjectSkillCreated) {
            setSelectedProject(projects.find(project => project._id == selectedProject._id));
            setIsProjectSkillDeleted(false);
        }
    }, [projects]);

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

    function dragStart(e, projectId) {
        e.dataTransfer.setData('text/plain', projectId);
        console.log(`drag started, dataId: ${e.target.dataset.id}`);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    async function drop(e) {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const dropTargetId = e.currentTarget.dataset.id;
        const draggedItem = projects.find(element => element._id == draggedId);
        const dropTargetOrder = projects.find(element => element._id == dropTargetId).order;
        let updatedProjects = [...projects];
        if (draggedItem.order > dropTargetOrder) {
            updatedProjects.forEach(project => {
                if (project.order >= dropTargetOrder) {
                    project.order++;
                }
            });
            updatedProjects.find(element => element._id == draggedId).order = dropTargetOrder;
            await Promise.all(updatedProjects.map(async (project) => {
                const updateResponse = await axios.patch(`${process.env.REACT_APP_API_URL}project/update/${project._id}`, 
                    { order: project.order },
                    { withCredentials: true }
                );
                console.log(updateResponse.data);
            }));
        } else if (draggedItem.order < dropTargetOrder) {
            updatedProjects.forEach(project => {
                if (project.order <= dropTargetOrder) {
                    project.order--;
                }
            });
            updatedProjects.find(element => element._id == draggedId).order = dropTargetOrder;
            await Promise.all(updatedProjects.map(async (project) => {
                const updateResponse = await axios.patch(`${process.env.REACT_APP_API_URL}project/update/${project._id}`, 
                    { order: project.order },
                    { withCredentials: true }
                );
                console.log(updateResponse.data);
            }));
        }
        fetchProjectsData();
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
                    setIsProjectSkillDeleted={setIsProjectSkillDeleted}
                    setIsProjectSkillCreated={setIsProjectSkillCreated}
                />
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <div className="flex justify-center items-center gap-2 md:col-span-2 xl:col-span-3">
                        <p className="text-2xl font-bold text-center">
                            Portfolio
                        </p>
                        <div className="relative group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>
                            <span className="w-32 absolute top-6 hidden group-hover:block bg-black text-white text-xs p-1 rounded">
                                Drag and drop to sort project cards.
                            </span>
                        </div>
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
                            dragStart={(e) => dragStart(e, project._id)}
                            dragOver={dragOver}
                            drop={drop}
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
