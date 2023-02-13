import { Page } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import LeagueForm from "../../../components/forms/LeagueForm";

const LeagueCreate = () => {
    const navigate = useNavigate();

    return (
        <Page title="New League">
            <Button
                label="< Leagues"
                onClick={() => navigate('/admin/leagues')}
                type="transparent"
            />
            <h1>Add New League</h1>
            <LeagueForm />
        </Page>
    );
};

export default LeagueCreate;