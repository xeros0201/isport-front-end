import { Page } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const SeasonCreate = () => {
    const navigate = useNavigate();

    return (
        <Page title="New Season">
            <Button
                label="< Seasons"
                onClick={() => navigate('/admin/seasons')}
                type="transparent"
            />
            <h1>Add New Season</h1>
        </Page>
    );
};

export default SeasonCreate;