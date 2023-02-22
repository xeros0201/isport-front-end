import { Page, Row } from "../../../components/layout";
import { Button } from "../../../components/common";
import { useNavigate } from "react-router-dom";
import UserForm from "../../../components/forms/UserForm";

const UserCreate = () => {
    const navigate = useNavigate();

    return (
        <Page title="New User">
            <Button
                label="Users"
                onClick={() => navigate('/admin/users')}
                type="transparent"
                icon="IoChevronBackOutline"
            />
            <h1>Add New User</h1>
            <UserForm />
        </Page>
    );
};

export default UserCreate;