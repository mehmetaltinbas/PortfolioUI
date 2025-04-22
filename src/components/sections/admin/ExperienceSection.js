import { useEffect, useState } from 'react';
import axios from 'axios';

function ExperienceSection({
    fetchUserData,
    user,
    selectedExperience,
    SelectExperience,
    toggleExperienceCreateForm,
    toggleExperienceUpdateForm,
}) {
    const [activityCreateFormData, setActivityCreateFromData] = useState({
        activity: '',
    });

    async function handleExperienceDeletionSubmit(e, experienceId) {
        e.preventDefault();
        try {
            const response = (
                await axios.delete(
                    `${process.env.REACT_APP_API_URL}experience/delete/${experienceId}`,
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

    async function handleActivityChange(e) {
        const { name, value } = e.target;
        setActivityCreateFromData({ ...activityCreateFormData, [name]: value });
    }

    async function handleActivityCreationSubmit(e, experienceId) {
        console.log(experienceId);
        e.preventDefault();
        try {
            const response = (
                await axios.post(
                    `${process.env.REACT_APP_API_URL}activity/create/${experienceId}`,
                    activityCreateFormData,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                )
            ).data;
            alert(response.message);
            setActivityCreateFromData({
                ...activityCreateFormData,
                activity: '',
            });
            fetchUserData();
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function handleActivityDeletionSubmit(e, activityId) {
        e.preventDefault();
        try {
            const response = (
                await axios.delete(
                    `${process.env.REACT_APP_API_URL}activity/delete/${activityId}`,
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

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
            <div className="w-full md:col-span-2 flex justify-between items-center gap-6">
                <p className="text-xl font-bold">Experience</p>
                <span className="w-full h-[1px] bg-blue-700"></span>
            </div>
            <div></div>
            <button
                onClick={(e) => toggleExperienceCreateForm(e)}
                className="w-fit py-1 px-4 border-[1px] border-gray rounded-full
            hover:border-black "
            >
                Add Experience
            </button>
            <div className="w-full md:col-span-3 flex flex-col justify-start items-start">
                <div className="w-full flex justify-center items-start gap-2">
                    <div className="flex flex-col justify-start items-start">
                        {user.experiences?.map((experience) => (
                            <div
                                key={experience._id}
                                data-id={experience._id}
                                onClick={() => SelectExperience(experience._id)}
                                className={`flex justify-center items-center gap-2
                            cursor-pointer hover:bg-blue-100 transition`}
                            >
                                <span
                                    id={experience._id}
                                    className={`w-[2px] h-[32px] bg-black ${selectedExperience._id === experience._id ? 'bg-blue-300' : ''}`}
                                ></span>
                                <div className="flex justify-start items-center gap-2">
                                    <form
                                        onSubmit={(e) =>
                                            handleExperienceDeletionSubmit(
                                                e,
                                                experience._id
                                            )
                                        }
                                    >
                                        <button
                                            type="submit"
                                            className="w-[20px] h-[20px] border rounded-full p-[2px] text-xs bg-red-200"
                                        >
                                            X
                                        </button>
                                    </form>
                                    <p
                                        className={`w-[100px] font-medium ${selectedExperience._id === experience._id ? 'text-blue-400' : ''}`}
                                    >
                                        {experience.company}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className={`w-full flex flex-col justify-start items-start gap-2`}
                    >
                        <div className="">
                            <div className="flex justify-start items-center gap-2">
                                <p className="text-lg font-medium">
                                    {selectedExperience?.position}
                                </p>
                                <a
                                    href={selectedExperience?.websiteLink}
                                    target="_blank"
                                    className="text-blue-800 hover:text-purple-800 underline"
                                >
                                    @{selectedExperience?.company}
                                </a>
                                <button
                                    onClick={toggleExperienceUpdateForm}
                                    className="py-1 px-4 border-[1px] border-gray rounded-full 
                                hover:border-black"
                                >
                                    Update
                                </button>
                            </div>
                            <p className="text-sm font-light">
                                {selectedExperience?.startDate} -{' '}
                                {selectedExperience?.endDate}
                            </p>
                        </div>
                        {selectedExperience?.activities?.map((activity) => (
                            <div className="flex justify-start items-center gap-2">
                                <p key={activity._id}>- {activity.activity}</p>
                                <form
                                    onSubmit={(e) =>
                                        handleActivityDeletionSubmit(
                                            e,
                                            activity._id
                                        )
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
                        <form
                            onSubmit={(e) =>
                                handleActivityCreationSubmit(
                                    e,
                                    selectedExperience._id
                                )
                            }
                            className="w-full flex justify-center items-center gap-2"
                        >
                            <textarea
                                id="activity"
                                name="activity"
                                value={activityCreateFormData.activity}
                                onChange={handleActivityChange}
                                placeholder="activity..."
                                className="w-full border px-2 py-1 rounded-[10px]"
                            ></textarea>
                            <button
                                type="submit"
                                className="px-2 py-1 border rounded-full whitespace-nowrap"
                            >
                                Add Activity
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExperienceSection;
