import { Page } from "../../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const TeamEdit = () => {
    const navigate = useNavigate();

    // Get id from url
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    return (
        <Page title="Edit Team">
            <Button
                label="Teams"
                onClick={() => navigate('/admin/teams')}
                type="transparent"
                icon="IoChevronBackOutline"
            />
            <h1>Edit Team</h1>
        </Page>
    );
};

export default TeamEdit;