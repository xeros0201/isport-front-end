import { Outlet, useNavigate } from "react-router-dom";
import { Container, Footer, Header } from "../../layout";
import { NavigationDropdown } from "../../dropdowns";

const PublicTemplate = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        links={[
          { label: 'Fixtures & Results', to: '/' },
          { label: 'Teams & Players Statistics', to: '/team-stats' },
          { label: 'Leaderboards', to: '/leaderboard' },
        ]}
      >
        <NavigationDropdown />
      </Header>
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default PublicTemplate;
