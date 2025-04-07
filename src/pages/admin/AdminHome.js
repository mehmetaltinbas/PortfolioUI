import axios from "axios";
import { useEffect, useState } from "react";
import ProfileInfoForm from "../../components/sections/admin/ProfileInfoForm";
import ProfilePhotoSection from "../../components/sections/admin/ProfilePhotoSection";
import ContactCreateForm from "../../components/sections/admin/ContactCreateForm";
import ContactUpdateForm from "../../components/sections/admin/ContactUpdateForm";
import ContactInfoSection from "../../components/sections/admin/ContactInfoSection";

function AdminHome() {
    const [user, setUser] = useState({});
    const [isContactCreateFormHidden, setIsContactCreateFormHidden] = useState(true);
    const [isContactUpdateFormHidden, setIsContactUpdateFormHidden] = useState(true);
    const [contactUpdateFormData, setContactUpdateFormData] = useState({
        _id: '',
        type: '',
        value: ''
    });


    const fetchUserData = async () => {
        try {
            const userResponse = (await axios.get(`${process.env.REACT_APP_API_URL}user/${process.env.REACT_APP_USER_ID}`)).data;
            setUser(userResponse.user);
        } catch (error) {
            console.error(`\n Error message --> ${error.message} \n Error stack --> ${error.stack} \n`);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    async function toggleContactCreateForm(e) {
        e.preventDefault();
        const contactCreateForm = document.getElementById('contactCreateForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = contactCreateForm.getBoundingClientRect();
        setIsContactCreateFormHidden((prev) => !prev);
        contactCreateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        contactCreateForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }


    async function toggleContactUpdateForm(e, contact) {
        e.preventDefault();
        setContactUpdateFormData(contact);
        const contactUpdateForm = document.getElementById('contactUpdateForm');
        const buttonRect = e.target.getBoundingClientRect();
        const formRect = contactUpdateForm.getBoundingClientRect();
        setIsContactUpdateFormHidden((prev) => !prev);
        contactUpdateForm.style.top = `${buttonRect.bottom + window.scrollY}px`;
        contactUpdateForm.style.left = `${buttonRect.left + (buttonRect.width/2) + window.scrollX - (formRect.width/2)}px`;
    }

    
    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">

                <ProfilePhotoSection fetchUserData={fetchUserData} user={user} />

                <ProfileInfoForm user={user} />

            </div>

            <ContactInfoSection fetchUserData={fetchUserData} user={user} toggleContactCreateForm={toggleContactCreateForm} toggleContactUpdateForm={toggleContactUpdateForm} />

            <ContactCreateForm fetchUserData={fetchUserData} isHidden={isContactCreateFormHidden} toggleContactCreateForm={toggleContactCreateForm} />

            <ContactUpdateForm fetchUserData={fetchUserData} isHidden={isContactUpdateFormHidden} toggleContactUpdateForm={toggleContactUpdateForm} contactUpdateFormData={contactUpdateFormData} setContactUpdateFormData={setContactUpdateFormData} />


        </div>
    );
}

export default AdminHome;