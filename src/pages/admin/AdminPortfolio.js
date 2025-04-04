import axios from "axios";
import { useEffect, useState } from "react";
import BodyButton from "../../components/buttons/BodyButton";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

function AdminPortfolio() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({
        title: '',
        shortDescription: '',
        longDescription: ''
    });
    const [projectUpdateFormData, setProjectUpdateFormData] = useState({});
    const [projectSkillForm, setProjectSkillForm] = useState({
        name: '',
    });
    const [isProjectSkillCreateFormHidden, setIsProjectSkillCreateFormHidden] = useState(true);
    const [isProjectCreateFormHidden, setIsProjectCreateFormHidden] = useState(true);
    const [projectCreateForm, setProjectCreateForm] = useState({
        title: '',
        shortDescription: '',
        longDescription: ''
    });


    const fetchProjectData = async () => {
        try {
            const projectsResponse = (await axios.get(`${process.env.REACT_APP_API_URL}project/getallbyuserid/${process.env.REACT_APP_USER_ID}`)).data;
            setProjects(projectsResponse.projects);
        } catch (error) {
            console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
        }
    };


    useEffect(() => {
        fetchProjectData();
    }, []);


    function SelectProject(e) {
        e.preventDefault();
        const clickedProject = projects.find(p => p._id == e.currentTarget.dataset.id);
        setSelectedProject(clickedProject);
        setProjectUpdateFormData(clickedProject);
        if (!isProjectSkillCreateFormHidden) setIsProjectSkillCreateFormHidden(true);
    }


    async function handleProjectUpdateChange(e) {
        const { name, type, value, checked } = e.target;
        setProjectUpdateFormData({
            ...projectUpdateFormData,
            [name]: type === "checkbox" ? checked : value
        });
    }


    async function handleProjectUpdateSubmit(e, projectId) {
        e.preventDefault();
        try {
            const response = (await axios.patch(
                `${process.env.REACT_APP_API_URL}project/update/${projectId}`,
                projectUpdateFormData,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchProjectData();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function ToggleProjectSkillCreateForm(e) {
        e.preventDefault();
        const projectSkillCreationForm = document.getElementById('projectSkillCreationForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = projectSkillCreationForm.getBoundingClientRect();
        setIsProjectSkillCreateFormHidden((prev) => !prev);
        projectSkillCreationForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        projectSkillCreationForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }


    async function handleProjectSkillChange(e) {
        const { name, value } = e.target;
        setProjectSkillForm({ ...projectSkillForm, [name]: value });
    }


    async function handleProjectSkillCreateSubmit(e, projectId) {
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}projectskill/create/${projectId}`,
                projectSkillForm,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            ToggleProjectSkillCreateForm(e);
            fetchProjectData();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function handleProjectSkillDeleteSubmit(e, projectSkillId) {
        e.preventDefault();
        try {
            const response = (await axios.delete(
                `${process.env.REACT_APP_API_URL}projectskill/delete/${projectSkillId}`,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchProjectData();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function toggleProjectCreateForm(e) {
        e.preventDefault();
        const projectCreateForm = document.getElementById('projectCreateForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = projectCreateForm.getBoundingClientRect();
        setIsProjectCreateFormHidden((prev) => !prev);
        projectCreateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        projectCreateForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }


    async function handleProjectCreateChange(e) {
        const { name, type, value, checked } = e.target;
        setProjectCreateForm({
            ...projectCreateForm,
            [name]: type === "checkbox" ? checked : value
        });
    }


    async function handleProjectCreateSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}project/create`,
                projectCreateForm,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            toggleProjectCreateForm(e);
            fetchProjectData();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function handleProjectDeleteSubmit(e, projectId) {
        e.preventDefault();
        try {
            const response = (await axios.delete(
                `${process.env.REACT_APP_API_URL}project/delete/${projectId}`,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchProjectData();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }



    return (
        <div className="w-full">
            {selectedProject._id ? (
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex items-center justify-start gap-4">
                        <BodyButton onClick={() => { setSelectedProject({}); if (!isProjectSkillCreateFormHidden) setIsProjectSkillCreateFormHidden(true); }}>←</BodyButton>
                        <p className="inline-block text-2xl font-semibold flex-1">{selectedProject.title}</p>
                    </div>
                    <form onSubmit={(e) => handleProjectUpdateSubmit(e, selectedProject._id)} className="w-full flex flex-col justify-center items-center gap-2">
                        <div className="w-full flex justify-start items-center gap-2">
                            <label className="whitespace-nowrap">Title: </label>
                            <input name="title" onChange={handleProjectUpdateChange} value={projectUpdateFormData.title} className="border p-2 rounded-[10px] w-full" />
                        </div>
                        <div className="w-full flex justify-start items-center gap-2">
                            <label className="whitespace-nowrap">Short Description: </label>
                            <textarea name="shortDescription" onChange={handleProjectUpdateChange} value={projectUpdateFormData.shortDescription} className="border p-2 rounded-[10px] w-full"></textarea>
                        </div>
                        <div className="w-full flex justify-start items-center gap-2">
                            <label className="whitespace-nowrap">Long Description: </label>
                            <textarea name="longDescription" onChange={handleProjectUpdateChange} value={projectUpdateFormData.longDescription} className="border p-2 rounded-[10px] w-full"></textarea>
                        </div>
                        <button type="submit" className="px-2 py-1 border rounded-full w-fit">Save</button>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="flex justify-center items-center gap-2">
                            <p className="font-semibold">Project Skills</p>
                            <button onClick={ToggleProjectSkillCreateForm} className="text-2xl text-blue-500">+</button>
                        </div>
                        <div className="w-full flex justify-start items-center gap-[10px]">
                            {selectedProject.projectSkills.map((projectSkill) => (
                                <div className="flex justify-start items-center">
                                    <p className="whitespace-nowrap">• {projectSkill.name}</p>
                                    <form onSubmit={(e) => handleProjectSkillDeleteSubmit(e, projectSkill._id)}>
                                        <button type="submit" className="w-[20px] h-[20px] border rounded-full p-[2px] text-xs bg-red-200">X</button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <div className="flex justify-center items-center gap-2 md:col-span-2 xl:col-span-3">
                        <p className="text-2xl font-bold text-center">Projects</p>    
                        <button onClick={toggleProjectCreateForm} className="text-2xl text-blue-400">+</button>
                    </div>
                    {projects.map((project) => (
                        <div key={project._id} data-id={project._id} onClick={SelectProject} className="w-[200px] h-[200px] bg-white p-6 rounded-2xl shadow-md border
                        flex flex-col justify-around items-center gap-2
                        transition hover:border-[#00316E] duration-300 hover:cursor-pointer">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <div className="w-full flex justify-between items-center">
                                    <FaFolder className="text-xl" />
                                </div>
                                <p className="text-lg font-semibold">{project.title}</p>
                                <form onSubmit={(e) => handleProjectDeleteSubmit(e, project._id)}>
                                    <button type="submit" onClick={(e) => e.stopPropagation()} className="border rounded-full px-2 py-2 text-red-400">Delete</button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            
            <form id="projectSkillCreationForm" onSubmit={(e) => handleProjectSkillCreateSubmit(e, selectedProject._id)} 
            className={`absolute ${isProjectSkillCreateFormHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
            flex flex-col justify-center items-center gap-2`}>
                <input id="name" name="name" value={projectSkillForm.name} onChange={handleProjectSkillChange} placeholder="name..."
                className="border p-2 rounded-full" />
                <button type="submit" className="p-2 border rounded-full">Add</button>
            </form>


            <form id="projectCreateForm" onSubmit={handleProjectCreateSubmit} 
            className={`absolute ${isProjectCreateFormHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
            flex flex-col justify-center items-center gap-2`}>
                <div>
                    <label>Title: </label>
                    <input id="title" name="title" value={projectCreateForm.title} onChange={handleProjectCreateChange} placeholder="title..."
                    className="border p-2 rounded-full" />
                </div>
                <div>
                    <label>Short Description: </label>
                    <input id="shortDescription" name="shortDescription" value={projectCreateForm.shortDescription} onChange={handleProjectCreateChange} placeholder="short description..."
                    className="border p-2 rounded-full" />
                </div>
                <div>
                    <label>Long Description: </label>
                    <input id="longDescription" name="longDescription" value={projectCreateForm.longDescription} onChange={handleProjectCreateChange} placeholder="long description..."
                    className="border p-2 rounded-full" />
                </div>
                <button type="submit" className="p-2 border rounded-full">Create</button>
            </form>


        </div>
    );
}

export default AdminPortfolio;