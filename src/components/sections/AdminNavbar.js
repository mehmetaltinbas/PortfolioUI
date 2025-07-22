import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBarButton from '../buttons/NavBarButton';
import { Menu, X } from 'lucide-react';

function AdminNavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-3 mb-3 bg-black shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-1 px-4">
                <div className="flex justify-end md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <X className="text-white" />
                        ) : (
                            <Menu className="text-white" />
                        )}
                    </button>
                </div>

                <div
                    className={`flex-col md:flex md:flex-row justify-center items-center gap-4 ${isOpen ? 'flex' : 'hidden'} md:flex`}
                >
                    <p className="text-red-500">Admin Panel</p>
                    <NavBarButton onClick={() => setIsOpen(false)}>
                        <Link to="/admin">Home</Link>
                    </NavBarButton>
                    <NavBarButton onClick={() => setIsOpen(false)}>
                        <Link to="/admin/resume">Resume</Link>
                    </NavBarButton>
                    <NavBarButton onClick={() => setIsOpen(false)}>
                        <Link to="/admin/portfolio">Portfolio</Link>
                    </NavBarButton>
                </div>
            </div>
        </section>
    );
}

export default AdminNavBar;
