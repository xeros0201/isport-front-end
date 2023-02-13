import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const PlayerList = () => {
    const navigate = useNavigate();

    return (
        <Page title="Players">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Players</h1>
                <Button
                    label="New Player"
                    onClick={() => navigate('/admin/players/new')}
                />
            </Row>
        </Page>
    );
};

export default PlayerList;