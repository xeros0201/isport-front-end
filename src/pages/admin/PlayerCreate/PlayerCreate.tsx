import { Page } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const PlayerCreate = () => {
    const navigate = useNavigate();

    return (
        <Page title="New Player">
            <Button
                label="< Players"
                onClick={() => navigate('/admin/players')}
                type="transparent"
            />
            <h1>Add New Player</h1>
        </Page>
    );
};

export default PlayerCreate;