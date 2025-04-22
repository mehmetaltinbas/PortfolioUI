import { Outlet } from 'react-router-dom';
import NavBar from '../../components/sections/NavBar.js';
import SocialIcons from '../../components/sections/SocialIcons.js';

const VisitorLayout = () => {
    return (
        <>
            <NavBar />
            <section className="container mx-auto px-[70px] md:px-[100px] lg:px-[140px] xl:px-[200px] py-6">
                <Outlet />
            </section>
            <SocialIcons />
        </>
    );
};

export default VisitorLayout;
