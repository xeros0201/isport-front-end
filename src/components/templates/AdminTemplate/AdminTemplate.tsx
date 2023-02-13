import { Outlet, useNavigate } from "react-router-dom";
import { Container, Footer, Header } from "../../layout";

const AdminTemplate = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header links={[
        { label: 'Leagues', onClick: () => navigate("/admin/leagues") },
        { label: 'Seasons', onClick: () => navigate("/admin/seasons") },
        { label: 'Teams', onClick: () => navigate("/admin/teams") },
        { label: 'Players', onClick: () => navigate("/admin/players") },
        { label: 'Matches', onClick: () => navigate("/admin/matches") },
        { label: 'Users', onClick: () => navigate("/admin/users") },
      ]} />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminTemplate;