import { Page, Row } from "../../../components/layout";
import { Button } from "../../../components/common";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../../../api/users";
import { TextInput } from "../../../components/input";
import { UserTable } from "../../../components/tables";

const UserList = () => {
    const [query, setQuery] = useState('');

    // Fetch data
    const { isLoading, data: users } = useQuery(
        ["getUsers"], async () => await getUsers()
    );

    // Filter data to match query  
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user: any) => user.email);
    }, [users, query]);    
    
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
            <TextInput
                placeholder="Search..."
                value={query}
                onChange={setQuery}
                icon="IoSearch"
                rounded
            />
            <UserTable data={filteredUsers} isLoading={isLoading} />
        </Page>
    );
};

export default UserList;