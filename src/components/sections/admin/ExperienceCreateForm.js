import { useEffect, useState } from "react";
import axios from "axios";

function ExperienceCreateForm({ fetchUserData, toggleForm, isHidden}) {
    const [formData, setFormData] = useState({
        company: '',
        websiteLink: '',
        position: '',
        activity: '',
        isCurrent: false,
        startDate: '',
        endDate: ''
    });

    async function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}experience/create`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchUserData();
        } catch (error) {
            console.error("Error:", error.message);
        }
        toggleForm(e);
    }


    return (
        <form id="experienceCreationForm" onSubmit={handleSubmit}
        className={`absolute ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
        flex flex-col justify-center items-center gap-2`}>
            <input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="company..."
            className="border p-2 rounded-full" />
            <input id="websiteLink" name="websiteLink" value={formData.websiteLink} onChange={handleChange} placeholder="websiteLink..."
            className="border p-2 rounded-full" />
            <input id="position" name="position" value={formData.position} onChange={handleChange} placeholder="position..."
            className="border p-2 rounded-full" />
            <input id="isCurrent" name="isCurrent" value={formData.isCurrent} onChange={handleChange} placeholder="isCurrent..."
            className="border p-2 rounded-full" />
            <input id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="startDate..."
            className="border p-2 rounded-full" />
            <input id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="endDate..."
            className="border p-2 rounded-full" />
            <button type="submit" className="p-2 border rounded-full">Add</button>
        </form>
    );
};

export default ExperienceCreateForm;