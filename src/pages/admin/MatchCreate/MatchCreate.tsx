import { Page } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import MatchForm from "../../../components/forms/MatchForm";

const MatchCreate = () => {
  const navigate = useNavigate();

  return (
    <Page title="New Match">
      <Button
        label="Matches"
        onClick={() => navigate("/admin/matches")}
        type="transparent"
        icon="IoChevronBackOutline"
      />
      <h1>Add New Match</h1>
      <MatchForm />
    </Page>
  );
};

export default MatchCreate;
