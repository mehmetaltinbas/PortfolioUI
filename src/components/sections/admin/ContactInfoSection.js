import axios from 'axios';
import { useEffect, useState } from 'react';

function ContactInfoSection({
    fetchUserData,
    user,
    toggleContactCreateForm,
    toggleContactUpdateForm,
}) {
    const [CVFile, setCVFile] = useState(null);

    async function downloadCV(e) {
        e.preventDefault();
        console.log(`${process.env.REACT_APP_API_URL}contact/cv/download`);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}contact/cv/download`,
                {
                    responseType: 'blob',
                    withCredentials: true,
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cv.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('CV download error:', error.message);
        }
    }

    async function handleCVCreateChange(e) {
        setCVFile(e.target.files[0]);
    }

    async function handleCVCreateSubmit(e) {
        e.preventDefault();
        const CVFileFormData = new FormData();
        CVFileFormData.append('file', CVFile);
        try {
            const response = (
                await axios.patch(
                    `${process.env.REACT_APP_API_URL}contact/cv/update`,
                    CVFileFormData,
                    {
                        withCredentials: true,
                    }
                )
            ).data;
            alert(response.message);
            fetchUserData();
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function handleContactDeleteSubmit(e, contactId) {
        e.preventDefault();

        const response = (
            await axios.delete(
                `${process.env.REACT_APP_API_URL}contact/delete/${contactId}`,
                {
                    withCredentials: true,
                }
            )
        ).data;
        alert(response.message);
        fetchUserData();
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center gap-2">
                <p className="text-xl font-bold">Contact Information</p>
                <button
                    onClick={toggleContactCreateForm}
                    className="text-2xl font-semibold text-blue-400"
                >
                    +
                </button>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <div className="flex justify-center items-center gap-2">
                    <p>Current CV File: </p>
                    <button onClick={downloadCV}>Download CV</button>
                </div>
                <form
                    onSubmit={handleCVCreateSubmit}
                    className="flex justify-center items-center gap-2"
                >
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleCVCreateChange}
                    />
                    <button type="submit" className="p-2 border rounded-full">
                        Update
                    </button>
                </form>
            </div>
            {user?.contacts?.map((contact) => (
                <div className="flex justify-center items-center gap-2">
                    <label className="font-semibold">Type:</label>
                    <p>{contact.type}</p>
                    <label className="font-semibold">Value:</label>
                    <p>{contact.value}</p>
                    <button
                        onClick={(e) => toggleContactUpdateForm(e, contact)}
                        className="p-2 border rounded-full"
                    >
                        Update
                    </button>
                    <form
                        onSubmit={(e) =>
                            handleContactDeleteSubmit(e, contact._id)
                        }
                    >
                        <button
                            type="submit"
                            className="p-2 border rounded-full text-red-400"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            ))}
        </div>
    );
}

export default ContactInfoSection;
