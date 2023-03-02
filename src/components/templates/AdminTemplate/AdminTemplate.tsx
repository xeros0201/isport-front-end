import { Outlet } from "react-router-dom";
import { AccountDropdown } from "../../dropdowns";
import { Container, Footer, Header } from "../../layout";
const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;

const adminMenu: Menu = [
    { label: 'Leagues', path: `${adminPrefix}/leagues` },
    { label: 'Seasons', path: `${adminPrefix}/seasons` },
    { label: 'Teams', path: `${adminPrefix}/teams` },
    { label: 'Players', path: `${adminPrefix}/players` },
    { label: 'Matches', path: `${adminPrefix}/matches` },
    { label: 'Users', path: `${adminPrefix}/users` },
]

const AdminTemplate = () => {
  return (
    <div>
      <Header menu={adminMenu} collapseWidth={630}>
        <AccountDropdown />
      </Header>
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default AdminTemplate;