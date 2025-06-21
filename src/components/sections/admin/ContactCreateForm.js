import axios from 'axios';
import { useEffect, useState } from 'react';

function ContactCreateForm({
    fetchUserData,
    isHidden,
    toggleContactCreateForm,
}) {
    const [contactCreateFormData, setContactCreateFormData] = useState({
        type: '',
        value: '',
    });
    const [selectedlLinkTitle, setSelectedLinkTitle] = useState('');
    const [isLinkTitleOpitonsHidden, setIsLinkTitleOptionsHidden] = useState(true)

    async function handleContactCreateChange(e) {
        const { name, value } = e.target;
        setContactCreateFormData({ ...contactCreateFormData, [name]: value });
    }

    async function handleContactCreateSubmit(e) {
        e.preventDefault();
        try {
            const response = (
                await axios.post(
                    `${process.env.REACT_APP_API_URL}contact/create`,
                    contactCreateFormData,
                    {
                        withCredentials: true,
                    }
                )
            ).data;
            alert(response.message);
            fetchUserData();
            toggleContactCreateForm(e);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    function toggleLinkTitleOpitons(e) {
        e.preventDefault();
        const linkTitleOptions = document.getElementById('linkTitleOptions');
        const buttonRect = e.target.getBoundingClientRect();
        const linkTitleOptionsRect = linkTitleOptions.getBoundingClientRect();
        setIsLinkTitleOptionsHidden((prev) => !prev);
        linkTitleOptions.style.top = `${buttonRect.bottom + window.scrollY}px`;
        linkTitleOptions.style.left = `${buttonRect.left + buttonRect.width / 2 + window.scrollX - linkTitleOptionsRect.width / 2}px`;
    }

    function chooseLinkTitle(e) {
        console.log(e.target.value)
        setSelectedLinkTitle(e.target.value)
        const linkTitleInput = document.getElementById('linkTitleInput')
        console.log(linkTitleInput);
        linkTitleInput.value = e.target.value;
        setContactCreateFormData({ type: e.target.value })
    }

    return (
        <div>
            <form
                id="contactCreateForm"
                onSubmit={handleContactCreateSubmit}
                className={`absolute flex flex-col justify-center items-center ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
            flex flex-col justify-center items-center gap-2`}
            >
                <p className="text-xl font-bold"></p>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <label htmlFor="firstName">Link Title:</label>
                        <input
                            id="linkTitleInput"
                            name="type"
                            value={contactCreateFormData.type}
                            onChange={handleContactCreateChange}
                            className="border p-2 rounded-full"
                            placeholder=''
                        />
                        <button
                            type='button'
                            className='w-4 h-4'
                            onClick={toggleLinkTitleOpitons}
                        >↓</button>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <label htmlFor="firstName">URL:</label>
                        <input
                            id="value"
                            name="value"
                            value={contactCreateFormData.value}
                            onChange={handleContactCreateChange}
                            className="border p-2 rounded-full"
                        />
                    </div>
                </div>
                <button type="submit" className="p-2 border rounded-full">
                    Create
                </button>
            </form>
            <div id='linkTitleOptions' className={`absolute ${isLinkTitleOpitonsHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
            flex flex-col justify-center items-center gap-2`}>
                <button onClick={(e) => { chooseLinkTitle(e); toggleLinkTitleOpitons(e); }} value='instagram' className='p-2 rounded-xl shadow-md border'>Instagram</button>
                <button onClick={(e) => { chooseLinkTitle(e); toggleLinkTitleOpitons(e); }} value='github' className='p-2 rounded-xl shadow-md border'>GitHub</button>
                <button onClick={(e) => { chooseLinkTitle(e); toggleLinkTitleOpitons(e); }} value='linkedin' className='p-2 rounded-xl shadow-md border'>LinkedIn</button>
                <button onClick={(e) => { chooseLinkTitle(e); toggleLinkTitleOpitons(e); }} value='youtube' className='p-2 rounded-xl shadow-md border'>YouTube</button>
                <button onClick={(e) => { chooseLinkTitle(e); toggleLinkTitleOpitons(e); }} value='twitter' className='p-2 rounded-xl shadow-md border'>Twitter/X</button>
            </div>
        </div>
    );
}

export default ContactCreateForm;
