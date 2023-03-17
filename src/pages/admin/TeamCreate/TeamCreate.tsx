import { Page } from "../../../components/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import TeamForm from "../../../components/forms/TeamForm";

const TeamCreate = () => {
  const navigate = useNavigate();

  return (
    <Page title="New Team">
      <Button
        label="Teams"
        onClick={() => navigate("/admin/teams")}
        type="transparent"
        icon="IoChevronBackOutline"
      />
      <h1>Add New Team</h1>
      <TeamForm />
    </Page>
  );
};

export default TeamCreate;
