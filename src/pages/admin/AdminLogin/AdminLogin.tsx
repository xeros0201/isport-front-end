import { LoginForm } from "../../../components/forms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckAuth } from "../../../hooks";
import { Page } from "../../../components/layout";

const AdminLogin = () => {
    const { isCheckingAuth, isAuthed } = useCheckAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isCheckingAuth && isAuthed) {
            navigate('/admin/leagues');
        }
    }, [isAuthed])

    return (
        <Page title="Login">
            <LoginForm />
        </Page>
    );
}

export default AdminLogin;