import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProtectedRoute({ element }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}user/authorize`, { withCredentials: true })
            .then(response => setIsAuthenticated(response.data.isSuccess))
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated == null) return <p>Loading...</p>
    return isAuthenticated ? element : <Navigate to="/admin/signin" />;
}

export default ProtectedRoute;