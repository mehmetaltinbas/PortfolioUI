import axios from "axios";
import { useEffect, useState } from "react";

function Contact() {
    const [contacts, setContact] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contactsResponse = (await axios.get(`${process.env.REACT_APP_API_URL}contact/${process.env.REACT_APP_USER_ID}`)).data;
                setContact(contactsResponse.contacts);
            } catch (error) {
                console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
            }
        }
        fetchData();
    }, []);


    return (
        <div className="flex flex-col justify-center items-center gap-2">
            {contacts.map((contact) => (
                <p>{contact.type}: {contact.value}</p>
            ))}
        </div>
    );
}

export default Contact;