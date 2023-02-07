import { Outlet, useNavigate } from "react-router-dom";
import { Container, Header } from "../../layout";

const AdminTemplate = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header links={[
        { label: 'Leagues', onClick: () => navigate("/admin/leagues") },
        { label: 'Seasons', onClick: () => navigate("") },
        { label: 'Teams', onClick: () => navigate("") },
        { label: 'Players', onClick: () => navigate("") },
        { label: 'Matches', onClick: () => navigate("") },
        { label: 'Users', onClick: () => navigate("") },
      ]} />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminTemplate;