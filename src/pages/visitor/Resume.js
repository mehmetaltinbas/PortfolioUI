import axios from "axios";
import { useEffect, useState } from "react";

function Resume() {
    const [user, setUser] = useState({});
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [loading, setLoading] = useState(true);

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}user/${process.env.REACT_APP_USER_ID}`);
            const userData = response.data.user;
    
            const endDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;  // "2025-03-01T00:00:00.000Z" format

            userData.experiences.forEach(experience => {
                experience.startDate = formatDate(experience.startDate);
                experience.endDate = experience.isCurrent ? "Present" : formatDate(experience.endDate);
            });
            userData.educations.forEach(education => {
                education.startDate = new Date(education.startDate).toLocaleDateString();
                education.startDate = formatDate(education.startDate);
                if (endDateFormat.test(education.endDate)) {
                    education.endDate = new Date(education.endDate).toLocaleDateString();
                    education.endDate = formatDate(education.endDate);
                } 
            });

            const birthdate = new Date(userData.dateOfBirth);
            userData.age = new Date().getFullYear() - birthdate.getFullYear();
    
            setUser(userData);
            setSelectedExperience(userData.experiences[0]);
        } catch (error) {
            console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const SelectExperience = (experienceId) => {
        const experience =  user.experiences.find(e => e._id == experienceId);
        setSelectedExperience(experience);
    }


    if (loading) {
        return (
            <div className="flex justify-center items-center text-xl font-bold">
                Loading...
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-16">

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                <div className="w-full flex justify-between items-center gap-6">
                    <p className="text-xl font-bold whitespace-nowrap">About Me</p>
                    <span className="w-full h-[1px] bg-blue-700"></span>
                </div>
                <div></div>
                <div className="w-full mx-auto flex flex-col justify-center items-center gap-2">
                    <p>{user.about}</p>
                    <p className="underline">Skills</p>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {user.skills?.map((skill) => (
                            <p>- {skill.name}</p>
                        ))}
                    </div>
                </div>
                <div className="w-full mx-auto flex justify-center">
                    <img src={user?.userPhotos?.find(userPhoto => userPhoto.type == 'about')?.value} className="w-[210px] h-[370px] object-cover rounded-[10px]"/>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
                <div className="w-full md:col-span-2 flex justify-between items-center gap-6">
                    <p className="text-xl font-bold">Experience</p>
                    <span className="w-full h-[1px] bg-blue-700"></span>
                </div>
                <div className="w-full md:col-span-3 flex flex-col justify-start items-start">
                    <div className="flex justify-center items-start gap-2">
                        <div className="flex flex-col justify-start items-start">
                            {user.experiences?.map((experience) => (
                                <div key={experience._id} data-id={experience._id} onClick={() => SelectExperience(experience._id)} className={`flex justify-center items-center gap-2
                                cursor-pointer hover:bg-blue-100 transition`}>
                                    <span id={experience._id} className={`w-[2px] h-[32px] bg-black ${selectedExperience._id === experience._id ? 'bg-blue-400' : ''}`}></span>
                                    <p className="w-[100px] font-medium">{experience.company}</p>
                                </div>
                            ))}
                        </div>
                        <div className={`
                        flex flex-col justify-start items-start gap-2`}>
                            <div className="">
                                <p className="text-lg font-medium">{selectedExperience?.position} <a href={selectedExperience?.websiteLink} target="_blank" className="text-blue-800 hover:text-purple-800 underline">@{selectedExperience?.company}</a></p>
                                <p className="text-sm font-light">{selectedExperience?.startDate} - {selectedExperience?.endDate}</p>                                
                            </div>

                            {selectedExperience?.tasks?.map((task) => (
                                <p>- {task}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Resume;