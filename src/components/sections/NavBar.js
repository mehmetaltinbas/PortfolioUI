import { Link } from 'react-router-dom';
import NavBarButton from '../buttons/NavBarButton';

function NavBar() {
    return (
        <section className="pt-3 mb-3 bg-gray-700">
            <div className="flex flex-col gap-1">
                <div className="flex justify-center items-center gap-4 pb-3">
                    <NavBarButton><Link to='/'>Home</Link></NavBarButton>
                    <NavBarButton><Link to='/resume'>Resume</Link></NavBarButton>
                    <NavBarButton><Link to='/portfolio'>Portfolio</Link></NavBarButton>
                    <NavBarButton><Link to='/contact'>Contact</Link></NavBarButton>
                    <NavBarButton><Link to='/more'>More</Link></NavBarButton>
                </div>
            </div>
        </section>
    );
}

export default NavBar;