import { Page } from "../../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const SeasonEdit = () => {
    const navigate = useNavigate();

    // Get id from url
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    return (
        <Page title="Edit Season">
            <Button
                label="Seasons"
                onClick={() => navigate('/admin/seasons')}
                type="transparent"
                icon="IoChevronBackOutline"
            />
            <h1>Edit Season</h1>
        </Page>
    );
};

export default SeasonEdit;