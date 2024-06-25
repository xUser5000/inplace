import { useEffect, useState } from "react";
import { useAuth } from "./providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const { token, loading } = useAuth()
    const [isLoading, setIsLoading] = useState(loading)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }, [])
    return (
        !isLoading && (token !== null ? <Outlet /> : <Navigate to='/login' />)
    )
};