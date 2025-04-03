import { Outlet } from 'react-router-dom';
import AdminNavBar from '../../components/sections/AdminNavbar.js';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminNavBar />
            <section className="container mx-auto px-[70px] md:px-[100px] lg:px-[140px] xl:px-[200px] py-6">
                <Outlet />
            </section>
        </div>
    );
};

export default AdminLayout;