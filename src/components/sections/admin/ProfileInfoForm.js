import axios from 'axios';
import { useEffect, useState } from 'react';

function ProfileInfoForm({ user }) {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        position: '',
        bio: '',
        location: '',
        dateOfBirth: '',
    });

    useEffect(() => {
        setFormData(user);
    }, [user]);

    async function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (
                await axios.patch(
                    `${process.env.REACT_APP_API_URL}user/update`,
                    formData,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                )
            ).data;
            console.log(response);
            alert(response.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-2"
        >
            <p className="text-xl font-bold">Profile Information</p>
            <fieldset className="flex flex-col gap-2">
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="firstName">User Name:</label>
                    <input
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="border p-2 rounded-full"
                    />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border p-2 rounded-full"
                    />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border p-2 rounded-full"
                    />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="position">Position:</label>
                    <input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="border p-2 rounded-full"
                    />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-[400px] border p-2 rounded-[10px]"
                    ></textarea>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="firstName">Location:</label>
                    <input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border p-2 rounded-full"
                    />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="firstName">Date of Birth:</label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="border p-2 rounded-full"
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                className="p-2 border rounded-full bg-green-300"
            >
                Save
            </button>
        </form>
    );
}

export default ProfileInfoForm;
