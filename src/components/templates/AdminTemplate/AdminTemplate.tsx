import { Outlet } from "react-router-dom";
import { AccountDropdown } from "../../dropdowns";
import { Container, Footer, Header } from "../../layout";
import { useCheckAuth } from "../../../hooks";
import { useQuery } from "react-query";
import { checkAuth } from "../../../api/auth";
const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;

const staffMenu: Menu = [
  { label: "Leagues", path: `${adminPrefix}/leagues` },
  { label: "Seasons", path: `${adminPrefix}/seasons` },
  { label: "Teams", path: `${adminPrefix}/teams` },
  { label: "Players", path: `${adminPrefix}/players` },
  { label: "Matches", path: `${adminPrefix}/matches` },
];

const adminMenu: Menu = [
  ...staffMenu,
  { label: "Users", path: `${adminPrefix}/users` },
];

const AdminTemplate = () => {
  const { user } = useCheckAuth()

  return (
    <div>
      <Header
        menu={user?.role === "ADMIN" ? adminMenu : staffMenu}
        collapseWidth={680}
      >
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
