import axios from "axios";
import { useEffect, useState } from "react";

function AdminResume() {
    const [user, setUser] = useState({});
    const [selectedExperience, setSelectedExperience] = useState({
        company: '',
        websiteLink: '',
        position: '',
        activity: '',
        isCurrent: false,
        startDate: '',
        endDate: ''
    });
    const [userFormData, setUserFormData] = useState({
        about: ''
    });
    const [isSkillCreationFormHidden, setIsSkillCreationFormHidden] = useState(true);
    const [skillFormData, setSkillFormData] = useState({
        name: ''
    });
    const [isExperienceCreationFormHidden, setIsExperienceCreationFormHidden] = useState(true);
    const [experienceFormData, setExperienceFormData] = useState({
        company: '',
        websiteLink: '',
        position: '',
        activity: '',
        isCurrent: false,
        startDate: '',
        endDate: ''
    });
    const [activityFormData, setActivityFormData] = useState({
        activity: ''
    });
    const [isExperienceUpdateFormHidden, setIsExperienceUpdateFormHidden] = useState(true);
    const [experienceUpdateFormData, setExperienceUpdateFormData] = useState({
        company: '',
        websiteLink: '',
        position: '',
        activity: '',
        isCurrent: false,
        startDate: '',
        endDate: ''
    });
    const [aboutMePhoto, setAboutMePhoto] = useState(null);


    const fetchUserData = async () => {
        try {
            const response = (await axios.get(`${process.env.REACT_APP_API_URL}user/${process.env.REACT_APP_USER_ID}`)).data;
            const user = response.user;
    
            setUser(user);
            setSelectedExperience(user.experiences[0]);
            setExperienceUpdateFormData(user.experiences[0]);
        } catch (error) {
            console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        setUserFormData({
            about: user.about
        });
    }, [user])

    useEffect(() => {
        setExperienceUpdateFormData(selectedExperience);
    }, [selectedExperience]);

    const SelectExperience = (experienceId) => {
        const experience =  user.experiences.find(e => e._id == experienceId);
        setSelectedExperience(experience);
    }

    async function handleUserChange(e) {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    async function handleUserSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.patch(
                `${process.env.REACT_APP_API_URL}user/update`,
                userFormData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )).data;
            alert(response.message);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    async function ToggleSkillCreationForm(e) {
        e.preventDefault();
        const skillCreationForm = document.getElementById('skillCreationForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = skillCreationForm.getBoundingClientRect();
        setIsSkillCreationFormHidden((prev) => !prev);
        skillCreationForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        skillCreationForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }

    async function handleSkillChange(e) {
        const { name, value } = e.target;
        setSkillFormData({ ...skillFormData, [name]: value });
    }

    async function handleSkillSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}skill/create`,
                skillFormData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )).data;
            alert(response.message);
        } catch (error) {
            console.error("Error:", error.message);
        }
        ToggleSkillCreationForm(e);
    }

    async function handleSkillDeletionSubmit(e, skillId) {
        e.preventDefault();
        try {
            const response = (await axios.delete(
                `${process.env.REACT_APP_API_URL}skill/delete/${skillId}`,
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

    async function ToggleExperienceCreationForm(e) {
        e.preventDefault();
        const experienceCreationForm = document.getElementById('experienceCreationForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = experienceCreationForm.getBoundingClientRect();
        setIsExperienceCreationFormHidden((prev) => !prev);
        experienceCreationForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        experienceCreationForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }

    async function handleExperienceChange(e) {
        const { name, value } = e.target;
        setSkillFormData({ ...skillFormData, [name]: value });
    }


    async function handleExperienceCreationSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}experience/create`,
                experienceFormData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            fetchUserData();
        } catch (error) {
            console.error("Error:", error.message);
        }
        ToggleExperienceCreationForm(e);
    }


    async function ToggleExperienceUpdateForm(e) {
        e.preventDefault();
        const experienceUpdateForm = document.getElementById('experienceUpdateForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = experienceUpdateForm.getBoundingClientRect();
        setIsExperienceUpdateFormHidden((prev) => !prev);
        experienceUpdateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        experienceUpdateForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }


    async function handleExperienceUpdateChange(e) {
        const { name, type, value, checked } = e.target;
        setExperienceUpdateFormData({
            ...experienceUpdateFormData,
            [name]: type === "checkbox" ? checked : value
        });
    }


    async function handleExperienceUpdateSubmit(e, experienceId) {
        e.preventDefault();
        try {
            const response = (await axios.patch(
                `${process.env.REACT_APP_API_URL}experience/update/${experienceId}`,
                experienceUpdateFormData,
                {
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            ToggleExperienceUpdateForm(e);
            fetchUserData();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function handleExperienceDeletionSubmit(e, experienceId) {
        e.preventDefault();
        try {
            const response = (await axios.delete(
                `${process.env.REACT_APP_API_URL}experience/delete/${experienceId}`,
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


    async function handleActivityChange(e) {
        const { name, value } = e.target;
        setActivityFormData({ ...activityFormData, [name]: value });
    }


    async function handleActivityCreationSubmit(e, experienceId) {
        console.log(experienceId);
        e.preventDefault();
        try {
            const response = (await axios.post(
                `${process.env.REACT_APP_API_URL}activity/create/${experienceId}`,
                activityFormData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )).data;
            alert(response.message);
            setActivityFormData({ ...activityFormData, activity: '' });
            fetchUserData();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    async function handleActivityDeletionSubmit(e, activityId) {
        e.preventDefault();
        try {
            const response = (await axios.delete(
                `${process.env.REACT_APP_API_URL}activity/delete/${activityId}`,
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


    async function handleAboutMePhotoUpdateChange(e) {
        setAboutMePhoto(e.target.files[0]);
    };


    async function handleAboutMePhotoUpdateSubmit(e) {
        e.preventDefault();
        if (!aboutMePhoto) return;

        const aboutMePhotoForm = new FormData();
        aboutMePhotoForm.append("file", aboutMePhoto);

        const response = (await axios.patch(
            `${process.env.REACT_APP_API_URL}user/update/aboutmephoto`,
            aboutMePhotoForm,
            {
                headers: { "Content-Type": "multipart/form-data"},
                withCredentials: true
            }
        )).data;
        alert(response.message);
        fetchUserData();
    };


    async function handleAboutMePhotoDeleteSubmit(e) {
        e.preventDefault();

        const response = (await axios.delete(
            `${process.env.REACT_APP_API_URL}user/delete/aboutmephoto`,
            {
                withCredentials: true
            }
        )).data;
        alert(response.message);
        fetchUserData();
    };


    
    return (
        <div className="w-full flex flex-col gap-16">

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                <div className="w-full flex justify-between items-center gap-6">
                    <p className="text-xl font-bold whitespace-nowrap">About Me</p>
                    <span className="w-full h-[1px] bg-blue-700"></span>
                </div>
                <div></div>
                <div className="w-full mx-auto flex flex-col justify-center items-center gap-2">
                    <form onSubmit={handleUserSubmit} className="w-full h-full flex justify-center items-center gap-2">
                        <textarea name="about" value={userFormData.about} onChange={handleUserChange}
                        className="border p-2 rounded-[10px] w-full h-full" ></textarea>
                        <button type="submit" className="w-fit p-2 border rounded-full bg-green-300">Save</button>
                    </form>
                    <div className="flex justify-center items-center gap-4">
                        <p className="underline">Skills</p>
                        <button onClick={ToggleSkillCreationForm} className="text-2xl text-blue-500">+</button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {user.skills?.map((skill) => (
                            <div className="flex justify-start items-center gap-[2px]">
                                <p className="whitespace-nowrap">- {skill.name}</p>
                                <form onSubmit={(e) => handleSkillDeletionSubmit(e, skill._id)}>
                                    <button type="submit" className="w-[20px] h-[20px] border rounded-full p-[2px] text-xs bg-red-200">X</button>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full mx-auto flex flex-col justify-center items-center">
                    <img src={user.aboutMePhotoPath} className="w-[210px] h-[370px] object-cover rounded-[10px]"/>
                    <form onSubmit={handleAboutMePhotoUpdateSubmit}>
                        <input type="file" onChange={handleAboutMePhotoUpdateChange}/>
                        <button type="submit" className="px-2 py-1 border rounded-full bg-blue-200">Update</button>
                    </form>
                    <form onSubmit={handleAboutMePhotoDeleteSubmit}>
                        <button className="px-2 py-1 border rounded-full bg-red-200">Delete</button>
                    </form>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
                <div className="w-full md:col-span-2 flex justify-between items-center gap-6">
                    <p className="text-xl font-bold">Experience</p>
                    <span className="w-full h-[1px] bg-blue-700"></span>
                </div>
                <div></div>
                <button onClick={ToggleExperienceCreationForm} className="w-fit py-1 px-4 border-[1px] border-gray rounded-full 
                hover:border-black ">Add Experience</button>
                <div className="w-full md:col-span-3 flex flex-col justify-start items-start">
                    <div className="w-full flex justify-center items-start gap-2">
                        <div className="flex flex-col justify-start items-start">
                            {user.experiences?.map((experience) => (
                                <div key={experience._id} data-id={experience._id} onClick={() => SelectExperience(experience._id)} className={`flex justify-center items-center gap-2
                                cursor-pointer hover:bg-blue-100 transition`}>
                                    <span id={experience._id} className={`w-[2px] h-[32px] bg-black ${selectedExperience._id === experience._id ? 'bg-blue-300' : ''}`}></span>
                                    <div className="flex justify-start items-center gap-2">
                                        <form onSubmit={(e) => handleExperienceDeletionSubmit(e, experience._id)}>
                                            <button type="submit" className="w-[20px] h-[20px] border rounded-full p-[2px] text-xs bg-red-200">X</button>
                                        </form>
                                        <p className={`w-[100px] font-medium ${selectedExperience._id === experience._id ? 'text-blue-400' : ''}`}>{experience.company}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={`w-full flex flex-col justify-start items-start gap-2`}>
                            <div className="">
                                <div className="flex justify-start items-center gap-2">
                                    <p className="text-lg font-medium">{selectedExperience?.position}</p>
                                    <a href={selectedExperience?.websiteLink} target="_blank" className="text-blue-800 hover:text-purple-800 underline">@{selectedExperience?.company}</a>
                                    <button onClick={ToggleExperienceUpdateForm} className="py-1 px-4 border-[1px] border-gray rounded-full 
                                    hover:border-black">Update</button>
                                </div>
                                <p className="text-sm font-light">{selectedExperience?.startDate} - {selectedExperience?.endDate}</p>
                            </div>
                            {selectedExperience?.activities?.map((activity) => (
                                <div className="flex justify-start items-center gap-2">
                                    <p key={activity._id}>- {activity.activity}</p>
                                    <form onSubmit={(e) => handleActivityDeletionSubmit(e, activity._id)}>
                                        <button type="submit" className="w-[20px] h-[20px] border rounded-full p-[2px] text-xs bg-red-200">X</button>
                                    </form>
                                </div>
                            ))}
                            <form onSubmit={(e) => handleActivityCreationSubmit(e, selectedExperience._id)} className="w-full flex justify-center items-center gap-2">
                                <textarea id="activity" name="activity" value={activityFormData.activity} onChange={handleActivityChange} placeholder="activity..."
                                className="w-full border px-2 py-1 rounded-[10px]" ></textarea>
                                <button type="submit" className="px-2 py-1 border rounded-full whitespace-nowrap">Add Activity</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <form id="skillCreationForm" onSubmit={handleSkillSubmit} 
            className={`absolute ${isSkillCreationFormHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
            flex flex-col justify-center items-center gap-2`}>
                <input id="name" name="name" value={skillFormData.name} onChange={handleSkillChange} placeholder="name..."
                className="border p-2 rounded-full" />
                <button type="submit" className="p-2 border rounded-full">Add</button>
            </form>


            <form id="experienceCreationForm" onSubmit={handleExperienceCreationSubmit}
            className={`absolute ${isExperienceCreationFormHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
            flex flex-col justify-center items-center gap-2`}>
                <input id="company" name="company" value={experienceFormData.company} onChange={handleExperienceChange} placeholder="company..."
                className="border p-2 rounded-full" />
                <input id="websiteLink" name="websiteLink" value={experienceFormData.websiteLink} onChange={handleExperienceChange} placeholder="websiteLink..."
                className="border p-2 rounded-full" />
                <input id="position" name="position" value={experienceFormData.position} onChange={handleExperienceChange} placeholder="position..."
                className="border p-2 rounded-full" />
                <input id="isCurrent" name="isCurrent" value={experienceFormData.isCurrent} onChange={handleExperienceChange} placeholder="isCurrent..."
                className="border p-2 rounded-full" />
                <input id="startDate" name="startDate" value={experienceFormData.startDate} onChange={handleExperienceChange} placeholder="startDate..."
                className="border p-2 rounded-full" />
                <input id="endDate" name="endDate" value={experienceFormData.endDate} onChange={handleExperienceChange} placeholder="endDate..."
                className="border p-2 rounded-full" />
                <button type="submit" className="p-2 border rounded-full">Add</button>
            </form>


            <form id="experienceUpdateForm" onSubmit={(e) => handleExperienceUpdateSubmit(e, selectedExperience._id)}
            className={`absolute ${isExperienceUpdateFormHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border
            flex flex-col justify-center items-center gap-2`}>
                <div className="flex justify-start items-center gap-2">
                    <label>Company: </label>
                    <input id="company" name="company" value={experienceUpdateFormData.company} onChange={handleExperienceUpdateChange} placeholder="company..."
                    className="border p-2 rounded-full" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <label>WebsiteLink: </label>
                    <input id="websiteLink" name="websiteLink" value={experienceUpdateFormData.websiteLink} onChange={handleExperienceUpdateChange} placeholder="websiteLink..."
                    className="border p-2 rounded-full" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <label>Position: </label>
                    <input id="position" name="position" value={experienceUpdateFormData.position} onChange={handleExperienceUpdateChange} placeholder="position..."
                    className="border p-2 rounded-full" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <label>IsCurrent: </label>
                    <input id="isCurrent" type="checkbox" name="isCurrent" checked={experienceUpdateFormData.isCurrent} onChange={(e) => setExperienceUpdateFormData({ ...experienceUpdateFormData, isCurrent: e.target.checked })} placeholder="isCurrent..."
                    className="border p-2 rounded-full" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <label>StartDate: </label>
                    <input id="startDate" name="startDate" value={experienceUpdateFormData.startDate} onChange={handleExperienceUpdateChange} placeholder="startDate..."
                    className="border p-2 rounded-full" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <label>EndDate: </label>
                    <input id="endDate" name="endDate" value={experienceUpdateFormData.endDate} onChange={handleExperienceUpdateChange} placeholder="endDate..."
                    className="border p-2 rounded-full" />
                </div>
                <button type="submit" className="p-2 border rounded-full">Update</button>
            </form>
        </div>
    );
}

export default AdminResume;