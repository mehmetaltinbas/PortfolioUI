import { useEffect, useState } from 'react';
import axios from 'axios';

function SkillCreateForm({ fetchUserData, toggleForm, isHidden }) {
    const [formData, setFormData] = useState({
        name: '',
    });

    async function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (
                await axios.post(
                    `${process.env.REACT_APP_API_URL}skill/create`,
                    formData,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                )
            ).data;
            alert(response.message);
            fetchUserData();
        } catch (error) {
            console.error('Error:', error.message);
        }
        toggleForm(e);
    }

    return (
        <form
            id="skillCreateForm"
            onSubmit={handleSubmit}
            className={`absolute ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
        flex flex-col justify-center items-center gap-2`}
        >
            <input
                id="name"
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

export default SkillCreateForm;
