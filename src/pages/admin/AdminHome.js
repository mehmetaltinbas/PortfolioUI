import axios from "axios";
import { useEffect, useState } from "react";

function AdminHome() {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        position: '',
        bio: '',
        location: '',
        dateOfBirth: '',
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [isContactCreateFormHidden, setIsContactCreateFormHidden] = useState(true);
    const [contactCreateFormData, setContactCreateFormData] = useState({
        type: '',
        value: ''
    });
    const [isContactUpdateFormHidden, setIsContactUpdateFormHidden] = useState(true);
    const [contactUpdateFormData, setContactUpdateFormData] = useState({
        _id: '',
        type: '',
        value: ''
    });
    const [CVFile, setCVFile] = useState(null);


    const fetchUserData = async () => {
        try {
            const userResponse = (await axios.get(`${process.env.REACT_APP_API_URL}user/${process.env.REACT_APP_USER_ID}`)).data;
            setUser(userResponse.user);
        } catch (error) {
            console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        setFormData(user);
    }, [user])

    async function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.patch(
                `${process.env.REACT_APP_API_URL}user/update`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )).data;
            console.log(response);
            alert(response.message);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function handleProfilePhotoUpdateChange(e) {
        setProfilePhoto(e.target.files[0]);
    };


    async function handleProfilePhotoUpdateSubmit(e) {
        e.preventDefault();
        if (!profilePhoto) return;

        const profilePhotoForm = new FormData();
        profilePhotoForm.append("file", profilePhoto);

        const response = (await axios.patch(
            `${process.env.REACT_APP_API_URL}user/update/profilephoto`,
            profilePhotoForm,
            {
                headers: { "Content-Type": "multipart/form-data"},
                withCredentials: true
            }
        )).data;
        alert(response.message);
        fetchUserData();
    };


    async function handleProfilePhotoDeleteSubmit(e) {
        e.preventDefault();

        const response = (await axios.delete(
            `${process.env.REACT_APP_API_URL}user/delete/profilephoto`,
            {
                withCredentials: true
            }
        )).data;
        alert(response.message);
        fetchUserData();
    };


    async function toggleContactCreateForm(e) {
        e.preventDefault();
        const contactCreateForm = document.getElementById('contactCreateForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = contactCreateForm.getBoundingClientRect();
        setIsContactCreateFormHidden((prev) => !prev);
        contactCreateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        contactCreateForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }


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


    async function toggleContactUpdateForm(e, contact) {
        e.preventDefault();
        setContactUpdateFormData(contact);
        const contactUpdateForm = document.getElementById('contactUpdateForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = contactUpdateForm.getBoundingClientRect();
        setIsContactUpdateFormHidden((prev) => !prev);
        contactUpdateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        contactUpdateForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }


    async function handleContactUpdateChange(e) {
        const { name, value } = e.target;
        setContactUpdateFormData({ ...contactUpdateFormData, [name]: value });
    }


    async function handleContactUpdateSubmit(e, contactId) {
        e.preventDefault();
        try {
            const response = (await axios.patch(
                `${process.env.REACT_APP_API_URL}contact/update/${contactId}`,
                contactUpdateFormData,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchUserData();
            toggleContactUpdateForm(e);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function handleContactDeleteSubmit(e, contactId) {
        e.preventDefault();

        const response = (await axios.delete(
            `${process.env.REACT_APP_API_URL}contact/delete/${contactId}`,
            {
                withCredentials: true
            }
        )).data;
        alert(response.message);
        fetchUserData();
    };


    async function handleCVCreateChange(e) {
        setCVFile(e.target.files[0]);
    }


    async function handleCVCreateSubmit(e) {
        e.preventDefault();
        const CVFileFormData = new FormData();
        CVFileFormData.append('file', CVFile);
        try {
            const response = (await axios.patch(
                `${process.env.REACT_APP_API_URL}contact/cv/update`,
                CVFileFormData,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchUserData();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function downloadCV(e) {
        e.preventDefault();
        console.log(`${process.env.REACT_APP_API_URL}contact/cv/download`);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}contact/cv/download`, {
                responseType: 'blob',
                withCredentials: true
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cv.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("CV download error:", error.message);
        }
    }
    

    
    return (
        <div>

            <div className="flex justify-center items-center gap-10 mb-10">

                <div className="flex flex-col justify-center items-center gap-2">
                    <img src={user.profilePhotoPath} className="w-[200px] h-[200px] object-cover rounded-full"/>
                    <form onSubmit={handleProfilePhotoUpdateSubmit}>
                        <input type="file" onChange={handleProfilePhotoUpdateChange}/>
                        <button type="submit" className="px-2 py-1 border rounded-full bg-blue-200">Update</button>
                    </form>
                    <form onSubmit={handleProfilePhotoDeleteSubmit}>
                        <button className="px-2 py-1 border rounded-full bg-red-200">Delete</button>
                    </form>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">
                    <p className="text-xl font-bold">Profile Information</p>
                    <fieldset className="flex flex-col gap-2">
                        <div className="flex justify-center items-center gap-2">
                            <label htmlFor="firstName">User Name:</label>
                            <input id="userName" name="userName" value={formData.userName} onChange={handleChange}
                            className="border p-2 rounded-full" />
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <label htmlFor="firstName">First Name:</label>
                            <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                            className="border p-2 rounded-full" />
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <label htmlFor="lastName">Last Name:</label>
                            <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} 
                            className="border p-2 rounded-full"/>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <label htmlFor="position">Position:</label>
                            <input id="position" name="position" value={formData.position} onChange={handleChange}
                            className="border p-2 rounded-full" />
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <label htmlFor="bio">Bio:</label>
                            <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange}
                            className="w-[400px] border p-2 rounded-[10px]" ></textarea>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <label htmlFor="firstName">Location:</label>
                            <input id="location" name="location" value={formData.location} onChange={handleChange}
                            className="border p-2 rounded-full" />
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <label htmlFor="firstName">Date of Birth:</label>
                            <input id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}
                            className="border p-2 rounded-full" />
                        </div>
                    </fieldset>
                    <button type="submit" className="p-2 border rounded-full bg-green-300">Save</button>
                </form>

            </div>

            <div className="flex flex-col justify-center items-center gap-2">
                <div className="flex justify-center items-center gap-2">
                    <p className="text-xl font-bold">Contact Information</p>
                    <button onClick={toggleContactCreateForm} className="text-2xl font-semibold text-blue-400">+</button>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <p>Current CV File: </p>
                        <button onClick={downloadCV}>Download CV</button>
                    </div>
                    <form onSubmit={handleCVCreateSubmit} className="flex justify-center items-center gap-2">
                        <input type="file" accept="application/pdf" onChange={handleCVCreateChange}/>
                        <button type="submit" className="p-2 border rounded-full">Update</button>
                    </form>
                </div>
                {user?.contacts?.map((contact) => (
                    <div className="flex justify-center items-center gap-2">
                        <label className="font-semibold">Type:</label>
                        <p>{contact.type}</p>
                        <label className="font-semibold">Value:</label>
                        <p>{contact.value}</p>
                        <button onClick={(e) => toggleContactUpdateForm(e, contact)} className="p-2 border rounded-full">Update</button>
                        <form onSubmit={(e) => handleContactDeleteSubmit(e, contact._id)}>
                            <button type="submit" className="p-2 border rounded-full text-red-400">Delete</button>
                        </form>
                    </div>
                ))}
            </div>


            <form id="contactCreateForm" onSubmit={handleContactCreateSubmit}
            className={`absolute flex flex-col justify-center items-center ${isContactCreateFormHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
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


            <form id="contactUpdateForm" onSubmit={(e) => handleContactUpdateSubmit(e, contactUpdateFormData._id)} className={`absolute flex flex-col justify-center items-center ${isContactUpdateFormHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
            flex flex-col justify-center items-center gap-2`}>
                <fieldset className="flex flex-col gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <label htmlFor="firstName">Type:</label>
                        <input id="type" name="type" value={contactUpdateFormData?.type} onChange={handleContactUpdateChange}
                        className="border p-2 rounded-full" />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <label htmlFor="firstName">Value:</label>
                        <input id="value" name="value" value={contactUpdateFormData?.value} onChange={handleContactUpdateChange}
                        className="border p-2 rounded-full" />
                    </div>
                </fieldset>
                <button type="submit" className="p-2 border rounded-full">Update</button>
            </form>


        </div>
    );
}

export default AdminHome;