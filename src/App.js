import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Visitor Layout
import VisitorLayout from './pages/visitor/VisitorLayout.js';
import Home from './pages/visitor/Home.js';
import Resume from './pages/visitor/Resume.js';
import Portfolio from './pages/visitor/Portfolio.js';
import Contact from './pages/visitor/Contact.js';
import More from './pages/visitor/More.js';

// Admin Layout
import AdminLayout from './pages/admin/AdminLayout.js';
import AdminHome from './pages/admin/AdminHome.js';
import AdminSignIn from './pages/admin/AdminSignIn.js';
import AdminResume from './pages/admin/AdminResume.js';
import AdminPortfolio from './pages/admin/AdminPortfolio.js';
import AdminContact from './pages/admin/AdminContact.js';
import AdminMore from './pages/admin/AdminMore.js';
import ProtectedRoute from './utilities/ProtectedRoute.js';

function App() {
    return (
        <Router>
            <Routes>
                {/* Visitor Routes */}
                <Route element={<VisitorLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/more" element={<More />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminLayout />}>
                    <Route
                        path="/admin"
                        element={<ProtectedRoute element={<AdminHome />} />}
                    />
                    <Route
                        path="/admin/resume"
                        element={<ProtectedRoute element={<AdminResume />} />}
                    />
                    <Route
                        path="/admin/portfolio"
                        element={
                            <ProtectedRoute element={<AdminPortfolio />} />
                        }
                    />
                    <Route
                        path="/admin/contact"
                        element={<ProtectedRoute element={<AdminContact />} />}
                    />
                    <Route
                        path="/admin/more"
                        element={<ProtectedRoute element={<AdminMore />} />}
                    />
                </Route>

                <Route path="/admin/signin" element={<AdminSignIn />} />
            </Routes>
        </Router>
    );
}

export default App;
