import { Page } from "../../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spinner } from "../../../components/common";
import LeagueForm from "../../../components/forms/LeagueForm";

const LeaguesEdit = () => {
    const navigate = useNavigate();

    // Get id from url
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    return (
        <Page title="Edit League">
            <Button
                label="< Leagues"
                onClick={() => navigate('/admin/leagues')}
                type="transparent"
            />
            <h1>Edit League</h1>
            {id && <LeagueForm id={+id} />}
        </Page>
    );
};

export default LeaguesEdit;