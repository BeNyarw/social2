import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PublicRoute = ({ component: Component, isAuthed,restricted, ...rest }) => (
        <Route {...rest} render={(props) => (
            !isAuthed
            ? <Component {...props} {...rest} />
            : <Redirect to="/dashboard"/>
        )} />
);

export default PublicRoute;
