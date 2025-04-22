import axios from 'axios';
import { useEffect, useState } from 'react';

function ContactUpdateForm({
    fetchUserData,
    isHidden,
    toggleContactUpdateForm,
    contactUpdateFormData,
    setContactUpdateFormData,
}) {
    async function handleContactUpdateChange(e) {
        const { name, value } = e.target;
        setContactUpdateFormData({ ...contactUpdateFormData, [name]: value });
    }

    async function handleContactUpdateSubmit(e, contactId) {
        e.preventDefault();
        try {
            const response = (
                await axios.patch(
                    `${process.env.REACT_APP_API_URL}contact/update/${contactId}`,
                    contactUpdateFormData,
                    {
                        withCredentials: true,
                    }
                )
            ).data;
            alert(response.message);
            fetchUserData();
            toggleContactUpdateForm(e);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <form
            id="contactUpdateForm"
            onSubmit={(e) =>
                handleContactUpdateSubmit(e, contactUpdateFormData._id)
            }
            className={`absolute flex flex-col justify-center items-center ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
        flex flex-col justify-center items-center gap-2`}
        >
            <fieldset className="flex flex-col gap-2">
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="firstName">Type:</label>
                    <input
                        id="type"
                        name="type"
                        value={contactUpdateFormData?.type}
                        onChange={handleContactUpdateChange}
                        className="border p-2 rounded-full"
                    />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="firstName">Value:</label>
                    <input
                        id="value"
                        name="value"
                        value={contactUpdateFormData?.value}
                        onChange={handleContactUpdateChange}
                        className="border p-2 rounded-full"
                    />
                </div>
            </fieldset>
            <button type="submit" className="p-2 border rounded-full">
                Update
            </button>
        </form>
    );
}

export default ContactUpdateForm;
