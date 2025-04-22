import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectPhotoCreateForm({
    fetchProjectsData,
    selectedProject,
    toggleForm,
    isHidden,
}) {
    const [projectPhoto, setProjectPhoto] = useState(null);

    async function handleChange(e) {
        setProjectPhoto(e.target.files[0]);
    }

    async function handleSubmit(e, projectId) {
        e.preventDefault();
        try {
            const projectPhotoForm = new FormData();
            projectPhotoForm.append('file', projectPhoto);

            const response = (
                await axios.post(
                    `${process.env.REACT_APP_API_URL}projectphoto/create/${projectId}`,
                    projectPhotoForm,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
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
            id="projectPhotoCreateForm"
            onSubmit={(e) => handleSubmit(e, selectedProject._id)}
            className={`absolute ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border flex flex-col justify-center items-center gap-2`}
        >
            <input type="file" onChange={handleChange} />
            <button
                type="submit"
                className="px-2 py-1 border rounded-full bg-blue-200"
            >
                Create
            </button>
        </form>
    );
}

export default ProjectPhotoCreateForm;
