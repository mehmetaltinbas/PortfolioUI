import axios from "axios";
import { useEffect, useState } from "react";
import StandardFlexContainer from "../../components/containers/standardFlexContainer";
import StandardGridContainer from "../../components/containers/standardGridContainer";
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
        <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-2xl font-bold text-center">{user.firstName} {user.lastName}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
            <p>{user.dateOfBirth}</p>
            <BodyButton>Download CV</BodyButton>
        </div>
    );
}

export default Home;