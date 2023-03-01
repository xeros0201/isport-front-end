import { Outlet, useNavigate } from "react-router-dom";
import { NavigationDropdown } from "../../dropdowns";
import { Container, Footer, Header } from "../../layout";
const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;

const AdminTemplate = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header links={[
        { label: 'Leagues', to: `${adminPrefix}/leagues` },
        { label: 'Seasons', to: `${adminPrefix}/seasons` },
        { label: 'Teams', to: `${adminPrefix}/teams` },
        { label: 'Players', to: `${adminPrefix}/players` },
        { label: 'Matches', to: `${adminPrefix}/matches` },
        { label: 'Users', to: `${adminPrefix}/users` },
      ]}>
        <NavigationDropdown />
      </Header>
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default AdminTemplate;