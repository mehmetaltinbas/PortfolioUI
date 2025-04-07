import axios from "axios";
import { useEffect, useState } from "react";

function ProfilePhotoSection({ fetchUserData, user }) {
    const [profilePhoto, setProfilePhoto] = useState(null);


    async function handleCreateChange(e) {
        setProfilePhoto(e.target.files[0]);
    };


    async function handleCreateSubmit(e) {
        e.preventDefault();
        if (!profilePhoto) return;

        const profilePhotoForm = new FormData();
        profilePhotoForm.append("file", profilePhoto);
        profilePhotoForm.append("type", "profile");

        const response = (await axios.post(
            `${process.env.REACT_APP_API_URL}userphoto/create`,
            profilePhotoForm,
            {
                headers: { "Content-Type": "multipart/form-data"},
                withCredentials: true
            }
        )).data;
        alert(response.message);
        fetchUserData();
    };


    async function handleDeleteSubmit(e) {
        e.preventDefault();
        const userPhotoId = user.userPhotos?.find(userPhoto => userPhoto.type == 'profile')._id;

        const response = (await axios.delete(
            `${process.env.REACT_APP_API_URL}userphoto/delete/${userPhotoId}`,
            {
                withCredentials: true
            }
        )).data;
        alert(response.message);
        fetchUserData();
    };

    
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <img src={user.userPhotos?.find(userPhoto => userPhoto.type == 'profile')?.value} className="w-[200px] h-[200px] object-cover rounded-full"/>
            <form onSubmit={handleCreateSubmit}>
                <input type="file" onChange={handleCreateChange}/>
                <button type="submit" className="px-2 py-1 border rounded-full bg-blue-200">Update</button>
            </form>
            <form onSubmit={handleDeleteSubmit}>
                <button className="px-2 py-1 border rounded-full bg-red-200">Delete</button>
            </form>
        </div>
    );
};

export default ProfilePhotoSection;