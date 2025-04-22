import { useEffect, useState } from 'react';
import axios from 'axios';
import ExperienceCreateForm from '../../components/sections/admin/ExperienceCreateForm';
import ExperienceUpdateForm from '../../components/sections/admin/ExperienceUpdateForm';
import SkillCreateForm from '../../components/sections/admin/SkillCreateForm';
import ExperienceSection from '../../components/sections/admin/ExperienceSection';

function AdminResume() {
    const [user, setUser] = useState({});
    const [selectedExperience, setSelectedExperience] = useState({
        company: '',
        websiteLink: '',
        position: '',
        activity: '',
        isCurrent: false,
        startDate: '',
        endDate: '',
    });
    const [userFormData, setUserFormData] = useState({
        about: '',
    });
    const [isSkillCreateFormHidden, setIsSkillCreateFormHidden] =
        useState(true);
    const [isExperienceCreateFormHidden, setIsExperienceCreateFormHidden] =
        useState(true);
    const [isExperienceUpdateFormHidden, setIsExperienceUpdateFormHidden] =
        useState(true);
    const [userAboutPhoto, setUserAboutPhoto] = useState(null);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const fetchUserData = async () => {
        try {
            const response = (
                await axios.get(
                    `${process.env.REACT_APP_API_URL}user/${process.env.REACT_APP_USER_ID}`
                )
            ).data;
            const user = response.user;

            user.experiences.forEach((experience) => {
                experience.startDate = formatDate(experience.startDate);
                experience.endDate = experience.isCurrent
                    ? 'Present'
                    : formatDate(experience.endDate);
            });

            setUser(user);
            if (user.experiences?.[0])
                setSelectedExperience(user.experiences[0]);
        } catch (error) {
            console.error(
                `\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`
            );
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        setUserFormData({
            about: user.about,
        });
    }, [user]);

    const SelectExperience = (experienceId) => {
        const experience = user.experiences.find((e) => e._id == experienceId);
        setSelectedExperience(experience);
    };

    async function handleUserChange(e) {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    async function handleUserSubmit(e) {
        e.preventDefault();
        try {
            const response = (
                await axios.patch(
                    `${process.env.REACT_APP_API_URL}user/update`,
                    userFormData,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                )
            ).data;
            alert(response.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function toggleSkillCreateForm(e) {
        e.preventDefault();
        const skillCreationForm = document.getElementById('skillCreateForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = skillCreationForm.getBoundingClientRect();
        setIsSkillCreateFormHidden((prev) => !prev);
        skillCreationForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        skillCreationForm.style.left = `${buttonRect.left + buttonRect.width / 2 + window.scrollX - formRect.width / 2}px`;
    }

    async function handleSkillDeletionSubmit(e, skillId) {
        e.preventDefault();
        try {
            const response = (
                await axios.delete(
                    `${process.env.REACT_APP_API_URL}skill/delete/${skillId}`,
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

    async function toggleExperienceCreateForm(e) {
        e.preventDefault();
        const experienceCreateForm = document.getElementById(
            'experienceCreateForm'
        );
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = experienceCreateForm.getBoundingClientRect();
        setIsExperienceCreateFormHidden((prev) => !prev);
        experienceCreateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        experienceCreateForm.style.left = `${buttonRect.left + buttonRect.width / 2 + window.scrollX - formRect.width / 2}px`;
    }

    async function toggleExperienceUpdateForm(e) {
        e.preventDefault();
        const experienceUpdateForm = document.getElementById(
            'experienceUpdateForm'
        );
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = experienceUpdateForm.getBoundingClientRect();
        setIsExperienceUpdateFormHidden((prev) => !prev);
        experienceUpdateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        experienceUpdateForm.style.left = `${buttonRect.left + buttonRect.width / 2 + window.scrollX - formRect.width / 2}px`;
    }

    async function handleAboutMePhotoUpdateChange(e) {
        setUserAboutPhoto(e.target.files[0]);
    }

    async function handleAboutMePhotoUpdateSubmit(e) {
        e.preventDefault();
        if (!userAboutPhoto) return;

        const aboutMePhotoForm = new FormData();
        aboutMePhotoForm.append('file', userAboutPhoto);
        aboutMePhotoForm.append('type', 'about');

        const response = (
            await axios.post(
                `${process.env.REACT_APP_API_URL}userphoto/create`,
                aboutMePhotoForm,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            )
        ).data;
        alert(response.message);
        fetchUserData();
    }

    async function handleAboutMePhotoDeleteSubmit(e) {
        e.preventDefault();
        const userPhotoId = user.userPhotos?.find(
            (userPhoto) => userPhoto.type == 'about'
        )._id;

        const response = (
            await axios.delete(
                `${process.env.REACT_APP_API_URL}userphoto/delete/${userPhotoId}`,
                {
                    withCredentials: true,
                }
            )
        ).data;
        alert(response.message);
        fetchUserData();
    }

    return (
        <div className="w-full flex flex-col gap-16">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                <div className="w-full flex justify-between items-center gap-6">
                    <p className="text-xl font-bold whitespace-nowrap">
                        About Me
                    </p>
                    <span className="w-full h-[1px] bg-blue-700"></span>
                </div>
                <div></div>
                <div className="w-full mx-auto flex flex-col justify-center items-center gap-2">
                    <form
                        onSubmit={handleUserSubmit}
                        className="w-full h-full flex justify-center items-center gap-2"
                    >
                        <textarea
                            name="about"
                            value={userFormData.about}
                            onChange={handleUserChange}
                            className="border p-2 rounded-[10px] w-full h-full"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-fit p-2 border rounded-full bg-green-300"
                        >
                            Save
                        </button>
                    </form>
                    <div className="flex justify-center items-center gap-4">
                        <p className="underline">Skills</p>
                        <button
                            onClick={toggleSkillCreateForm}
                            className="text-2xl text-blue-500"
                        >
                            +
                        </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {user.skills?.map((skill) => (
                            <div className="flex justify-start items-center gap-[2px]">
                                <p className="whitespace-nowrap">
                                    - {skill.name}
                                </p>
                                <form
                                    onSubmit={(e) =>
                                        handleSkillDeletionSubmit(e, skill._id)
                                    }
                                >
                                    <button
                                        type="submit"
                                        className="w-[20px] h-[20px] border rounded-full p-[2px] text-xs bg-red-200"
                                    >
                                        X
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full mx-auto flex flex-col justify-center items-center">
                    <img
                        src={
                            user.userPhotos?.find(
                                (userPhoto) => userPhoto.type == 'about'
                            )?.value
                        }
                        className="w-[210px] h-[370px] object-cover rounded-[10px]"
                    />
                    <form onSubmit={handleAboutMePhotoUpdateSubmit}>
                        <input
                            type="file"
                            onChange={handleAboutMePhotoUpdateChange}
                        />
                        <button
                            type="submit"
                            className="px-2 py-1 border rounded-full bg-blue-200"
                        >
                            Update
                        </button>
                    </form>
                    <form onSubmit={handleAboutMePhotoDeleteSubmit}>
                        <button className="px-2 py-1 border rounded-full bg-red-200">
                            Delete
                        </button>
                    </form>
                </div>
            </div>

            <ExperienceSection
                user={user}
                fetchUserData={fetchUserData}
                selectedExperience={selectedExperience}
                SelectExperience={SelectExperience}
                toggleExperienceCreateForm={toggleExperienceCreateForm}
                toggleExperienceUpdateForm={toggleExperienceUpdateForm}
            />

            <SkillCreateForm
                fetchUserData={fetchUserData}
                toggleForm={toggleSkillCreateForm}
                isHidden={isSkillCreateFormHidden}
            />

            <ExperienceCreateForm
                fetchUserData={fetchUserData}
                toggleForm={toggleExperienceCreateForm}
                isHidden={isExperienceCreateFormHidden}
            />

            <ExperienceUpdateForm
                fetchUserData={fetchUserData}
                toggleForm={toggleExperienceUpdateForm}
                isHidden={isExperienceUpdateFormHidden}
                selectedExperience={selectedExperience}
                firstExperience={
                    user?.experiences?.length > 0 ? user.experiences[0] : null
                }
            />
        </div>
    );
}

export default AdminResume;
