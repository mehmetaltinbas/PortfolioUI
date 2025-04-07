import axios from "axios";
import { useEffect, useState } from "react";
import Introduction from "../../components/sections/visitor/Introduction.js";

function Home() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);


    async function fetctUserData() {
        try {
            const userResponse = (await axios.get(`${process.env.REACT_APP_API_URL}user/${process.env.REACT_APP_USER_ID}`)).data;
            setUser(userResponse.user);
        } catch (error) {
            console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetctUserData();
    }, []);


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


    if (loading) {
        return (
            <div className="flex justify-center items-center text-xl font-bold">
                Loading...
            </div>
        )
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="flex flex-col justify-center items-center gap-2">
                <img src={user.userPhotos?.find(userPhoto => userPhoto.type == 'profile')?.value} className="w-[200px] h-[200px] object-cover rounded-full"/>
            </div>
            <Introduction user={user} downloadCV={downloadCV} />
        </div>

    );
}

export default Home;