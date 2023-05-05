import { Outlet } from "react-router-dom";
import { AccountDropdown } from "../../dropdowns";
import { Container, Footer, Header } from "../../layout";
import { useCheckAuth } from "../../../hooks";
import { useQuery } from "react-query";
import { checkAuth } from "../../../api/auth";
const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;

const staffMenu: Menu = [
  { label: 'Leagues', path: `${adminPrefix}/leagues` },
  { label: 'Seasons', path: `${adminPrefix}/seasons` },
  { label: 'Teams', path: `${adminPrefix}/teams` },
  { label: 'Players', path: `${adminPrefix}/players` },
  { label: 'Matches', path: `${adminPrefix}/matches` },
]

const adminMenu: Menu = [
    ...staffMenu,
    { label: 'Users', path: `${adminPrefix}/users` },
]

const AdminTemplate = () => {

  const { isLoading, data } = useQuery(
    ['getUserData'],
    async () =>checkAuth(),
    {   cacheTime: 1,
        refetchOnMount:"always",
        refetchOnWindowFocus: false ,
        staleTime:1000*60*60*24
    }
); 
    
  return (
    <div>
     <Header
        menu={data?.user?.role === "ADMIN" ? adminMenu : staffMenu}
        collapseWidth={680}
      >
        {!isLoading && <AccountDropdown />}
      </Header>
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default AdminTemplate;