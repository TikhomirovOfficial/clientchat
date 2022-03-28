import React from 'react';
import {Navigate} from "react-router-dom";

//public route
const PublicRoute = ({isAuth, Component}) => {
    return (
        isAuth ? <Navigate to="/"/> : <Component/>
    )
};

export default PublicRoute;