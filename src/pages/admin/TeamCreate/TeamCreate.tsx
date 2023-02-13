import { Page } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const TeamCreate = () => {
    const navigate = useNavigate();

    return (
        <Page title="New Team">
            <Button
                label="< Teams"
                onClick={() => navigate('/admin/teams')}
                type="transparent"
            />
            <h1>Add New Team</h1>
        </Page>
    );
};

export default TeamCreate;