import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/common";
import UserForm from "../../../components/forms/UserForm";
import { Page, Row } from "../../../components/layout";

const UserEdit = () => {
  const navigate = useNavigate();

  // Get id from url
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  return (
    <Page title="Edit User">
      <Button
        label="Users"
        onClick={() => navigate("/admin/users")}
        type="transparent"
        icon="IoChevronBackOutline"
      />
      <h1>Edit User</h1>
      {id && <UserForm id={+id} />}
    </Page>
  );
};

export default UserEdit;
