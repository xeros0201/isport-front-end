import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface RequireAuthProps {
    children: React.ReactElement;
    secured?: boolean;
    redirectTo?: string;
}

/**
 * Component used to wrap the react-router 'Route' component
 * to check if user has been authenticated before rendering
 * the component.
 *
 * Source: https://ui.dev/react-router-protected-routes-authentication
 */
function RequireAuth({ children, secured, redirectTo }: RequireAuthProps): React.ReactElement {
    const { isAuthed, checkAuth } = useContext(AuthContext);
    useEffect(() => {
        // checks auth on backend, if there is issue in non-dev env check function
        checkAuth();
    }, [redirectTo]);
    if (isAuthed || secured === false) {
        return children;
    } else if (isAuthed === false) {
        return <Navigate to="/login" replace />;
    }

    return <div />;
}

export default RequireAuth;
