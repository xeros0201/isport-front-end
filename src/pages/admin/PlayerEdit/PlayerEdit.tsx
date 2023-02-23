import { Page } from "../../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const PlayerEdit = () => {
    const navigate = useNavigate();

    // Get id from url
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    return (
        <Page title="Edit Player">
            <Button
                label="Players"
                onClick={() => navigate('/admin/players')}
                type="transparent"
                icon="IoChevronBackOutline"
            />
            <h1>Edit Player</h1>
        </Page>
    );
};

export default PlayerEdit;