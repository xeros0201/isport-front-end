import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const MatchList = () => {
    const navigate = useNavigate();

    return (
        <Page title="Matches">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Matches</h1>
                <Button
                    label="New Match"
                    onClick={() => navigate('/admin/matches/new')}
                    icon="IoAdd"
                />
            </Row>
        </Page>
    );
};

export default MatchList;