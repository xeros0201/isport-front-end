import { Page, Row } from "../../../components/layout";
import { Button, Icon } from "../../../components/common";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../../../api/users";

const UserList = () => {
    const [query, setQuery] = useState('');

    // Fetch data
    const { isLoading, data: users } = useQuery(
        ["getUsers"], async () => await getUsers()
    );
    
    const navigate = useNavigate();

    return (
        <Page title="Users">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Users</h1>
                <Button
                    label="New User"
                    onClick={() => navigate('/admin/users/create')}
                    icon="IoAdd"
                />
            </Row>
        </Page>
    );
};

export default UserList;