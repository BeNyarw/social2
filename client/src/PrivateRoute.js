import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "./auth";

const PrivateRoute = ({ component: Component, isAuthed,restricted, ...rest }) => (
        <Route {...rest} render={(props) => (
            isAuthed
            ? <Component {...props} {...rest} />
            : <Redirect to="/login"/>
        )} />
);
export default PrivateRoute;
