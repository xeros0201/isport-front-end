import { Outlet, useNavigate } from "react-router-dom";
import UserForm from "../../forms/UserForm";
import { Container, Footer, Header } from "../../layout";

const PublicTemplate = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        links={[
          { label: 'Fixtures & Results', to: '/' },
          { label: 'Teams & Players Statistics', to: '/team-stats' },
          { label: 'Leaderboards', to: 'leaderboard' },
        ]}
      />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default PublicTemplate;
