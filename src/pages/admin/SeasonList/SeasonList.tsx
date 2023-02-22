import { Page, Row } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";

const SeasonList = () => {
    const navigate = useNavigate();

    return (
        <Page title="Seasons">
            <Row alignItems='center' disableWrapping noFlex>
                <h1>Seasons</h1>
                <Button
                    label="New Season"
                    onClick={() => navigate('/admin/seasons/new')}
                    icon="IoAdd"
                />
            </Row>
        </Page>
    );
};

export default SeasonList;