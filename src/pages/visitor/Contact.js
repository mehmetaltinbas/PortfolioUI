import axios from 'axios';
import { useEffect, useState } from 'react';

function Contact() {
    const [contacts, setContact] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: '',
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const contactsResponse = (
                    await axios.get(
                        `${process.env.REACT_APP_API_URL}contact/${process.env.REACT_APP_USER_ID}`
                    )
                ).data;
                setContact(contactsResponse.contacts);
            } catch (error) {
                console.error(
                    `\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`
                );
            }
        }
        fetchData();
    }, []);

    async function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (
                await axios.post(
                    `${process.env.REACT_APP_API_URL}contact/sendmail`,
                    formData,
                    { headers: { 'Content-Type': 'application/json' } }
                )
            ).data;
            alert(response.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 flex flex-col justify-center items-center gap-2"
        >
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Contact Me
            </h2>
            <input
                type="email"
                name="email"
                placeholder="Your email..."
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="name"
                placeholder="Name..."
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                name="message"
                placeholder="Message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
            <button
                type="submit"
                className="py-1 px-4 border-[1px] border-gray rounded-full 
            hover:border-black"
            >
                Submit
            </button>
        </form>
    );
}

export default Contact;
