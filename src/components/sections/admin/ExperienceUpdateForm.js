import { useEffect, useState } from 'react';
import axios from 'axios';

function ExperienceUpdateForm({
    fetchUserData,
    toggleForm,
    isHidden,
    handleChange,
    handleSubmit,
    selectedExperience,
    firstExperience,
}) {
    const [formData, setFormData] = useState({
        company: '',
        websiteLink: '',
        position: '',
        activity: '',
        isCurrent: false,
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (firstExperience) {
            setFormData(firstExperience);
        }
    }, []);

    async function handleChange(e) {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    async function handleSubmit(e, experienceId) {
        e.preventDefault();
        try {
            const response = (
                await axios.patch(
                    `${process.env.REACT_APP_API_URL}experience/update/${experienceId}`,
                    formData,
                    {
                        withCredentials: true,
                    }
                )
            ).data;
            alert(response.message);
            toggleForm(e);
            fetchUserData();
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    useEffect(() => {
        setFormData(selectedExperience);
    }, [selectedExperience]);

    return (
        <form
            id="experienceUpdateForm"
            onSubmit={(e) => handleSubmit(e, selectedExperience._id)}
            className={`absolute ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
        flex flex-col justify-center items-center gap-2`}
        >
            <div className="flex justify-start items-center gap-2">
                <label>Company: </label>
                <input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="company..."
                    className="border p-2 rounded-full"
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>WebsiteLink: </label>
                <input
                    id="websiteLink"
                    name="websiteLink"
                    value={formData.websiteLink}
                    onChange={handleChange}
                    placeholder="websiteLink..."
                    className="border p-2 rounded-full"
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>Position: </label>
                <input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="position..."
                    className="border p-2 rounded-full"
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>IsCurrent: </label>
                <input
                    id="isCurrent"
                    type="checkbox"
                    name="isCurrent"
                    checked={formData.isCurrent}
                    onChange={handleChange}
                    placeholder="isCurrent..."
                    className="border p-2 rounded-full"
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>StartDate: </label>
                <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="startDate..."
                    className="border p-2 rounded-full"
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <label>EndDate: </label>
                <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    placeholder="endDate..."
                    className="border p-2 rounded-full"
                />
            </div>
            <button type="submit" className="p-2 border rounded-full">
                Update
            </button>
        </form>
    );
}

export default ExperienceUpdateForm;
