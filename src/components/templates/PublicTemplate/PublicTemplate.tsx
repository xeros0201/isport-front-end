import { Outlet } from "react-router-dom";
import { Container, Footer, Header } from "../../layout";
import { AccountDropdown } from "../../dropdowns";

const publicMenu: Menu = [
  { label: 'Fixtures & Results', path: '/' },
  { label: 'Teams & Players Statistics', path: '/team-stats' },
  { label: 'Leaderboards', path: '/leaderboard' },
]

const PublicTemplate = () => {
  return (
    <div>
      <Header menu={publicMenu} collapseWidth={700} >
        <AccountDropdown />
      </Header>
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default PublicTemplate;
