import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    let user = null;

    try {
        user = userData ? JSON.parse(userData) : null;
    } catch (error) {
        user = null;
    }

    if (token && user) {
        return (
            <Navigate
                to={user.role === "admin" ? "/admin" : "/"}
                replace
            />
        );
    }

    return <Outlet />;
}