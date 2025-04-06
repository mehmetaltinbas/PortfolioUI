import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from '../../components/sections/admin/ProjectCard.js';
import ProjectDetail from "../../components/sections/admin/ProjectDetails.js";
import ProjectCreateForm from "../../components/sections/admin/ProjectCreateForm.js";
import ProjectSkillCreateForm from "../../components/sections/admin/ProjectSkillCreateForm.js";
import ProjectPhotoCreateForm from "../../components/sections/admin/ProjectPhotoCreateForm.js";

function AdminPortfolio() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({
        _id: ''
    });
    const [projectCreateFormData, setProjectCreateFormData] = useState({ title: '', shortDescription: '', longDescription: '' });
    const [projectSkillFormData, setProjectSkillFormData] = useState({ name: '' });
    const [isProjectSkillCreateFormHidden, setIsProjectSkillCreateFormHidden] = useState(true);
    const [isProjectCreateFormHidden, setIsProjectCreateFormHidden] = useState(true);
    const [isProjectPhotoCreateFormHidden, setIsProjectPhotoCreateFormHidden] = useState(true);
    const [projectPhoto, setProjectPhoto] = useState(null);

    const fetchProjects = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}project/getallbyuserid/${process.env.REACT_APP_USER_ID}`);
        setProjects(response.data.projects);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    async function selectProject(e, project) {
        e.preventDefault();
        setSelectedProject(project);
    };

    async function handleProjectUpdate(e) {
        e.preventDefault();
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}project/update/${selectedProject._id}`, selectedProject);
        alert(response.data.message);
        fetchProjects();
    };

    async function handleToggleProjectCreateForm(e) {
        e.preventDefault();
        setIsProjectCreateFormHidden(prev => !prev);
    };

    async function handleProjectCreateChange(e) {
        setProjectCreateFormData({ ...projectCreateFormData, [e.target.name]: e.target.value });
    };

    async function handleProjectCreateSubmit(e) {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}project/create`, projectCreateFormData);
        alert("Project Created!");
        fetchProjects();
    };

    return (
        <div>
            {selectedProject?._id ? (
                <ProjectDetail project={selectedProject} onBack={setSelectedProject} onUpdateProject={handleProjectUpdate} onToggleSkillCreateForm={() => {}} onDeleteSkill={() => {}} onTogglePhotoCreateForm={() => {}} />
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <div className="flex justify-center items-center gap-2 md:col-span-2 xl:col-span-3">
                        <p className="text-2xl font-bold text-center">Projects</p>
                        <button onClick={handleToggleProjectCreateForm} className="text-2xl text-blue-400">+</button>
                    </div>
                    {projects.map((project) => (
                        <ProjectCard project={project} onSelectProject={selectProject} onDeleteProject={() => {}} />
                    ))}
                </div>
            )}

            <ProjectCreateForm formData={projectCreateFormData} onChange={handleProjectCreateChange} onSubmit={handleProjectCreateSubmit} isHidden={isProjectCreateFormHidden} />
            <ProjectSkillCreateForm formData={projectSkillFormData} onChange={(e) => setProjectSkillFormData({ ...projectSkillFormData, [e.target.name]: e.target.value })} onSubmit={() => {}} isHidden={isProjectSkillCreateFormHidden} />
            <ProjectPhotoCreateForm onChange={(e) => setProjectPhoto(e.target.files[0])} onSubmit={() => {}} isHidden={isProjectPhotoCreateFormHidden} />

        </div>
    );
}

export default AdminPortfolio;