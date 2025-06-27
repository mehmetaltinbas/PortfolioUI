import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectSkillCreateForm({
    fetchProjectsData,
    selectedProject,
    toggleForm,
    isHidden,
    setIsProjectSkillCreated
}) {
    const [formData, setFormData] = useState({
        name: '',
    });

    async function handleChange(e) {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    async function handleSubmit(e, projectId) {
        e.preventDefault();
        setIsProjectSkillCreated(true);
        try {
            const response = (
                await axios.post(
                    `${process.env.REACT_APP_API_URL}projectskill/create/${projectId}`,
                    formData,
                    {
                        withCredentials: true,
                    }
                )
            ).data;
            alert(response.message);
            toggleForm(e);
            fetchProjectsData();
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <form
            id="projectSkillCreateForm"
            onSubmit={(e) => handleSubmit(e, selectedProject._id)}
            className={`absolute ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border flex flex-col justify-center items-center gap-2`}
        >
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="name..."
                className="border p-2 rounded-full"
            />
            <button type="submit" className="p-2 border rounded-full">
                Add
            </button>
        </form>
    );
}

export default ProjectSkillCreateForm;
