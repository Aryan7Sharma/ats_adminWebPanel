
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from '../contexts/AuthContext';



export const IsUserLoggedIN = ({ children }) => {
    const { user } = useContext(AuthContext);
    if(user){
        return <Navigate to={'/dept/managedepts'} replace={true}></Navigate>;
    }
    return children
}

export const ProtectAllUserRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if(user){
        if(user.authToken){return children}
    }
    return <Navigate to={'/signin'} replace={true}></Navigate>;
}