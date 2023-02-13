import { Page } from "../../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const MatchEdit = () => {
    const navigate = useNavigate();

    // Get id from url
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    return (
        <Page title="Edit Match">
            <Button
                label="< Matches"
                onClick={() => navigate('/admin/matches')}
                type="transparent"
            />
            <h1>Edit Match</h1>
        </Page>
    );
};

export default MatchEdit;