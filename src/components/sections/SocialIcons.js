import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import axios from "axios";
import { useEffect, useState } from "react";

const SocialIcons = () => {
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
      <div className="fixed bottom-5 left-10 flex flex-col items-center gap-4">
        {contacts.find(c => c.type == "github") && (
          <a href={contacts.find(c => c.type == "github")?.value} target="_blank" className="text-gray-400 hover:text-gray-800 transition duration-300 text-2xl">
            <FaGithub />
          </a>
        )}
        {contacts.find(c => c.type == "linkedin") && (
          <a href={contacts.find(c => c.type == "linkedin")?.value} target="_blank" className="text-gray-400 hover:text-gray-800 transition duration-300 text-2xl">
            <FaLinkedin />
          </a>
        )}
        {contacts.find(c => c.type == "upwork") && (
          <a href={contacts.find(c => c.type == "upwork")?.value} target="_blank" className="text-gray-400 hover:text-gray-800 transition duration-300 text-2xl">
            <SiUpwork />
          </a>
        )}
        {contacts.find(c => c.type == "twitter") && (
          <a href={contacts.find(c => c.type == "twitter")?.value} target="_blank" className="text-gray-400 hover:text-gray-800 transition duration-300 text-2xl">
            <FaTwitter />
          </a>
        )}
        {contacts.find(c => c.type == "instagram") && (
          <a href={contacts.find(c => c.type == "instagram")?.value} target="_blank" className="text-gray-400 hover:text-gray-800 transition duration-300 text-2xl">
            <FaInstagram />
          </a>
        )}
        {contacts.find(c => c.type == "youtube") && (
          <a href={contacts.find(c => c.type == "youtube")?.value} target="_blank" className="text-gray-400 hover:text-gray-800 transition duration-300 text-2xl">
            <FaYoutube />
          </a>
        )}
        <div className="w-[1px] h-20 bg-gray-800 mt-2"></div>
      </div>
    );
};

export default SocialIcons;