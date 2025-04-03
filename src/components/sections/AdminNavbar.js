import { Link } from 'react-router-dom';
import NavBarButton from '../buttons/NavBarButton';

function NavBar() {
    return (
        <section className="pt-3 mb-3 bg-gray-700 shadow-lg">
            <div className="flex flex-col gap-1">
                <div className="flex justify-center items-center gap-4 pb-3">
                    <p className='text-red-500'>Admin Panel</p>
                    <NavBarButton><Link to='/admin'>Home</Link></NavBarButton>
                    <NavBarButton><Link to='/admin/resume'>Resume</Link></NavBarButton>
                    <NavBarButton><Link to='/admin/portfolio'>Portfolio</Link></NavBarButton>
                    <NavBarButton><Link to='/admin/contact'>Contact</Link></NavBarButton>
                    <NavBarButton><Link to='/admin/more'>More</Link></NavBarButton>
                </div>
            </div>
        </section>
    );
}

export default NavBar;