import { Page } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const MatchCreate = () => {
    const navigate = useNavigate();

    return (
        <Page title="New Match">
            <Button
                label="< Matches"
                onClick={() => navigate('/admin/matches')}
                type="transparent"
            />
            <h1>Add New Match</h1>
        </Page>
    );
};

export default MatchCreate;