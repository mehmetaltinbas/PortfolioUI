import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    async function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}user/signin`,
                formData,
                { 
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            if (response.isSuccess) navigate('/admin');
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} id="signInForm" action="/user/signin" method="POST" class="w-full h-1/2 flex flex-col justify-center items-center gap-2">
            <h1 className="font-bold text-xl">Admin Panel</h1>
            <h3 className="font-bold">Sign In</h3>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="username..."
            className="py-1 px-1"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password..."
            className="py-1 px-1"/>
            <button type="submit"
            className="bg-blue-500 text-white font-bold px-4 rounded-lg text-sm">Sign In</button>
        </form>
    );
}

export default AdminSignIn;