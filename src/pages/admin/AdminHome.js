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

    const fetchData = async () => {
        try {
            const userResponse = (await axios.get(`${process.env.REACT_APP_API_URL}user/${process.env.REACT_APP_USER_ID}`)).data;
            setUser(userResponse.user);
        } catch (error) {
            console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
        }
    }

    useEffect(() => {
        fetchData();
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
        fetchData();
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
        fetchData();
    };

    
    return (
        <div className="flex justify-center items-center gap-10">

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
    );
}

export default AdminHome;