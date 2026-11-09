import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
    const location = useLocation();

    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    let user = null;

    try {
        user = userData ? JSON.parse(userData) : null;
    } catch (error) {
        user = null;
    }

    // Periksa apakah pengguna sudah login
    if (!token || !user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Periksa hak akses berdasarkan role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <Navigate
                to={user.role === "admin" ? "/admin" : "/"}
                replace
            />
        );
    }

    return <Outlet />;
}