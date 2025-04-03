import axios from "axios";
import { useEffect, useState } from "react";
import BodyButton from "../../components/buttons/BodyButton";

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

    
    return (
        <div className="flex justify-center items-center gap-10">
            <div>
                <img src={user.profilePhotoPath} className="w-[200px] h-[200px] object-cover rounded-full"/>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-2xl font-bold text-center">{user.firstName} {user.lastName}</p>
                <p>{user.position}</p>
                <p>{user.bio}</p>
                <BodyButton>Download CV</BodyButton>
            </div>
        </div>

    );
}

export default Home;