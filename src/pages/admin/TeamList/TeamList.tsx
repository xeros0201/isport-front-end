import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const TeamList = () => {
    const navigate = useNavigate();

    return (
        <Page title="Teams">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Teams</h1>
                <Button
                    label="New Team"
                    onClick={() => navigate('/admin/teams/new')}
                />
            </Row>
        </Page>
    );
};

export default TeamList;