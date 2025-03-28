import { Link } from 'react-router-dom';
import NavBarButton from '../buttons/NavBarButton';

function NavBar() {
    return (
        <section className="container mx-auto px-[50px] md:px-[70px] lg:px-[90px] xl:px-[110px] py-3">
            <div className="flex flex-col gap-1">
                <div className="flex justify-center items-center gap-4">
                    <NavBarButton><Link to='/admin'>Home</Link></NavBarButton>
                    <NavBarButton><Link to='/admin/resume'>Resume</Link></NavBarButton>
                    <NavBarButton><Link to='/admin/portfolio'>Portfolio</Link></NavBarButton>
                    <NavBarButton><Link to='/admin/contact'>Contact</Link></NavBarButton>
                    <NavBarButton><Link to='/admin/more'>More</Link></NavBarButton>
                </div>
                <div className="h-[2px] bg-blue-700"></div>
            </div>
        </section>
    );
}

export default NavBar;