import axios from "axios";
import { useEffect, useState } from "react";
import Introduction from "../../components/sections/visitor/Introduction.js";

function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = (await axios.get(`${process.env.REACT_APP_API_URL}user/${process.env.REACT_APP_USER_ID}`)).data;
                setUser(userResponse.user);
            } catch (error) {
                console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
            }
        }
        fetchData();
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

    
    return (
        <div className="flex justify-center items-center gap-10">
            <div>
                <img src={user?.userPhotos?.find(userPhoto => userPhoto.type == 'profile')} className="w-[200px] h-[200px] object-cover rounded-full"/>
            </div>
            <Introduction user={user} downloadCV={downloadCV} />
        </div>

    );
}

export default Home;