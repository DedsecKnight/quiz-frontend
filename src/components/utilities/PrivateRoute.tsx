import React from "react";
import { AUTH_KEY } from "../../constants";
import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";

const PrivateRoute: React.FC<RouteProps> = (props) => {
    let isAuthenticated = localStorage.getItem(AUTH_KEY);

    if (isAuthenticated) return <Route {...props} />;
    return (
        <Route
            {...props}
            component={() => <Redirect to={{ pathname: "/login" }} />}
            render={undefined}
        />
    );
};

export default PrivateRoute;
