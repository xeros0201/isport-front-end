import { Page } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import PlayerForm from "../../../components/forms/PlayerForm";
import TeamForm from "../../../components/forms/TeamForm";

const PlayerCreate = () => {
    const navigate = useNavigate();

    return (
        <Page title="New Player">
            <Button
                label="Players"
                onClick={() => navigate('/admin/players')}
                type="transparent"
                icon="IoChevronBackOutline"
            />
            <h1>Add New Player</h1>
            <PlayerForm />
        </Page>
    );
};

export default PlayerCreate;
