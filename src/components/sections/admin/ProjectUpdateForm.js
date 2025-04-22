import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectUpdateForm({ selectedProject, setSelectedProject, fetchProjectsData }) {

    async function handleChange(e) {
        const { name, type, value, checked } = e.target;
        setSelectedProject({
            ...selectedProject,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    async function handleSubmit(e) {
        console.log('hit');
        e.preventDefault();
        const response = await axios.patch(
            `
            ${process.env.REACT_APP_API_URL}project/update/${selectedProject._id}`,
            selectedProject,
            {
                withCredentials: true,
            }
        );
        alert(response.data.message);
        fetchProjectsData();
    }

    return (
        <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center items-center gap-2"
        >
            <div className="w-full flex justify-start items-center gap-2">
                <label className="whitespace-nowrap">Title: </label>
                <input
                    name="title"
                    onChange={handleChange}
                    value={selectedProject.title}
                    className="border p-2 rounded-[10px] w-full"
                />
            </div>
            <div className="w-full flex justify-start items-center gap-2">
                <label className="whitespace-nowrap">
                    ShortDescription:{' '}
                </label>
                <input
                    name="shortDescription"
                    onChange={handleChange}
                    value={selectedProject.shortDescription}
                    className="border p-2 rounded-[10px] w-full"
                />
            </div>
            <div className="w-full flex justify-start items-center gap-2">
                <label className="whitespace-nowrap">
                    Long Description:{' '}
                </label>
                <textarea
                    name="longDescription"
                    onChange={handleChange}
                    value={selectedProject.longDescription}
                    className="border p-2 rounded-[10px] w-full"
                />
            </div>
            <button
                type="submit"
                className="px-2 py-1 border rounded-full w-fit"
            >
                Save
            </button>
        </form>
    )
}

export default ProjectUpdateForm;
