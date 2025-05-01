import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectCreateForm({ isHidden, fetchProjectsData, toggleForm }) {
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        longDescription: '',
    });

    async function onChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}project/create`,
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchProjectsData();
        } catch (error) {
            console.error('Error:', error.message);
        }
        toggleForm(e);
    }
    
    return (
        <form
            id="projectCreateForm"
            onSubmit={onSubmit}
            className={`${isHidden ? 'hidden' : ''} absolute bg-white p-6 rounded-2xl shadow-md border flex flex-col justify-center items-center gap-2`}
        >
            <div>
                <label>Title: </label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    placeholder="title..."
                    className="border p-2 rounded-full"
                />
            </div>
            <button type="submit" className="p-2 border rounded-full">
                Create
            </button>
        </form>
    );
}

export default ProjectCreateForm;
