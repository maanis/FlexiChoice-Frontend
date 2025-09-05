// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // skeleton or spinner

    if (!user) {
        return <Navigate to="/admin-login" replace />;
    }

    // (Optional) check if email is admin
    if (user.email !== "admin@raj.com") {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
};

export default ProtectedRoute;
