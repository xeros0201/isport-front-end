import { Navigate } from 'react-router-dom';
import { useCheckAuth } from '.././../hooks';

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
function RequireAuth({ children, secured, redirectTo }: RequireAuthProps) {
    const { isCheckingAuth, isAuthed } = useCheckAuth();

    if (!secured) return children;
    if (isCheckingAuth) return <></>;
    if (isAuthed) return children;

    return <Navigate to={import.meta.env.VITE_LOGIN_ROUTE} replace />
}

export default RequireAuth;
