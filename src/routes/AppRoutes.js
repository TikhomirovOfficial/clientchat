import React from 'react';
import {Route, Routes} from "react-router-dom";
import {isAuth} from "../App";
import {routes} from "./routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
    return (
        <Routes>
            {
                routes.privates.map(({path, exact, Component}) => (
                    <Route
                        path={path}
                        exact={exact}
                        element={<PrivateRoute isAuth={isAuth} Component={Component}/>}
                    />
                ))
            }
            {
                routes.public.map(({path, exact, Component}) => (
                    <Route
                        path={path}
                        exact={exact}
                        element={<PublicRoute isAuth={isAuth} Component={Component}/>}
                    />
                ))
            }
        </Routes>
    );
};

export default AppRoutes;