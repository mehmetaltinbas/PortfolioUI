import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/sections/NavBar.js";
import Home from './pages/public/Home.js';
import Portfolio from './pages/public/Portfolio.js';
import Contact from './pages/public/Contact.js';
import More from './pages/public/More.js';
import ProtectedRoute from "./utilities/ProtectedRoute.js";
import AdminHome from './pages/admin/AdminHome.js';
import AdminPortfolio from './pages/admin/AdminPortfolio.js';
import AdminContact from './pages/admin/AdminContact.js';
import AdminMore from './pages/admin/AdminMore.js';

function App() {
    return (
        <Router>
            <NavBar />
            <section className="container mx-auto px-[70px] md:px-[100px] lg:px-[140px] xl:px-[200px] py-6">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/portfolio" element={<Portfolio />}/>
                    <Route path="/contact" element={<Contact />}/>
                    <Route path="/more" element={<More />}/>
                    <Route path="/admin" element={<ProtectedRoute element={<AdminHome />}/>}/>
                    <Route path="/admin/portfolio" element={<ProtectedRoute element={<AdminPortfolio />}/>}/>
                    <Route path="/admin/contact" element={<ProtectedRoute element={<AdminContact />}/>}/>
                    <Route path="/admin/more" element={<ProtectedRoute element={<AdminMore />}/>}/>
                </Routes>
            </section>

        </Router>
    );
}

export default App;