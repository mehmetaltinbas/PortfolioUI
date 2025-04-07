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
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
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
        <form id="experienceCreateForm" onSubmit={handleSubmit}
        className={`absolute ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
        flex flex-col justify-center items-center gap-2`}>
            <div className="flex justify-start items-center gap-2">
                <label>Company: </label>
                <input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="company..."
                className="border p-2 rounded-full" />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>Website Link: </label>
                <input id="websiteLink" name="websiteLink" value={formData.websiteLink} onChange={handleChange} placeholder="websiteLink..."
                className="border p-2 rounded-full" />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>Position: </label>
                <input id="position" name="position" value={formData.position} onChange={handleChange} placeholder="position..."
                className="border p-2 rounded-full" />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>Is Current? </label>
                <input id="isCurrent" type="checkbox" name="isCurrent" value={formData.isCurrent} onChange={handleChange} placeholder="isCurrent..."
                className="border p-2 rounded-full" />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>Start Date: </label>
                <input id="startDate" type="date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="startDate..."
                className="border p-2 rounded-full" />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>End Date: </label>
                <input id="endDate" type="date" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="endDate..."
                className="border p-2 rounded-full" />
            </div>
            <button type="submit" className="p-2 border rounded-full">Add</button>
        </form>
    );
};

export default ExperienceCreateForm;