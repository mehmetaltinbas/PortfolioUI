import axios from "axios";
import { useEffect, useState } from "react";

function ContactCreateForm({ fetchUserData, isHidden, toggleContactCreateForm }) {
    const [contactCreateFormData, setContactCreateFormData] = useState({
        type: '',
        value: ''
    });


    async function handleContactCreateChange(e) {
        const { name, value } = e.target;
        setContactCreateFormData({ ...contactCreateFormData, [name]: value });
    }


    async function handleContactCreateSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}contact/create`,
                contactCreateFormData,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchUserData();
            toggleContactCreateForm(e);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    return (
        <form id="contactCreateForm" onSubmit={handleContactCreateSubmit}
        className={`absolute flex flex-col justify-center items-center ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
        flex flex-col justify-center items-center gap-2`}>
            <p className="text-xl font-bold"></p>
            <fieldset className="flex flex-col gap-2">
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="firstName">Type:</label>
                    <input id="type" name="type" value={contactCreateFormData.type} onChange={handleContactCreateChange}
                    className="border p-2 rounded-full" />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="firstName">Value:</label>
                    <input id="value" name="value" value={contactCreateFormData.value} onChange={handleContactCreateChange}
                    className="border p-2 rounded-full" />
                </div>
            </fieldset>
            <button type="submit" className="p-2 border rounded-full">Create</button>
        </form>
    );
};

export default ContactCreateForm;