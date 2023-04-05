import { Page } from "../../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import MatchForm from "../../../components/forms/MatchForm";

const MatchEdit = () => {
  const navigate = useNavigate();

  // Get id from url
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  return (
    <Page title="Edit Match">
      <Button
        label="Matches"
        onClick={() => navigate("/admin/matches")}
        type="transparent"
        icon="IoChevronBackOutline"
      />
      <h1>Edit Match</h1>
      {id && <MatchForm id={+id} />}
    </Page>
  );
};

export default MatchEdit;
