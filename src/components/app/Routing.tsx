import { Routes, Route, Navigate } from 'react-router-dom';
// import RequireAuth from './RequireAuth';
import MatchReport from '../../pages/public/MatchReport/MatchReport';
import FourOhFour from '../../pages/public/FourOhFour/FourOhFour';
import AdminLogin from '../../pages/admin/AdminLogin/AdminLogin';
import AdminTemplate from '../templates/AdminTemplate/AdminTemplate';
import PublicTemplate from '../templates/PublicTemplate/PublicTemplate';
import Leaderboard from '../../pages/public/Leaderboard/Leaderboard';
import TeamStats from '../../pages/public/TeamStats/TeamStats';
import Fixtures from '../../pages/public/Fixtures/Fixtures';
import LeagueList from '../../pages/admin/LeagueList/LeagueList';
import LeagueCreate from '../../pages/admin/LeagueCreate/LeagueCreate';
import LeagueEdit from '../../pages/admin/LeagueEdit/LeagueEdit';
import SeasonList from '../../pages/admin/SeasonList/SeasonList';
import SeasonCreate from '../../pages/admin/SeasonCreate/SeasonCreate';
import SeasonEdit from '../../pages/admin/SeasonEdit/SeasonEdit';
import TeamList from '../../pages/admin/TeamList/TeamList';
import TeamCreate from '../../pages/admin/TeamCreate/TeamCreate';
import TeamEdit from '../../pages/admin/TeamEdit/TeamEdit';
import PlayerList from '../../pages/admin/PlayerList/PlayerList';
import PlayerCreate from '../../pages/admin/PlayerCreate/PlayerCreate';
import PlayerEdit from '../../pages/admin/PlayerEdit/PlayerEdit';
import MatchList from '../../pages/admin/MatchList/MatchList';
import MatchCreate from '../../pages/admin/MatchCreate/MatchCreate';
import MatchEdit from '../../pages/admin/MatchEdit/MatchEdit';
import UserList from '../../pages/admin/UserList/UserList';
import UserEdit from '../../pages/admin/UserEdit/UserEdit';
import UserCreate from '../../pages/admin/UserCreate/UserCreate';
import Test from '../../pages/admin/Test/Test';
import RequireAuth from './RequireAuth';
const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX;

export interface RouteConfig {
    path: string;
    name: string;
    exact: boolean;
    Component: () => React.ReactElement;
    secured: boolean;
}

/**
 * List of routes used in the admin app.
 */
export const adminRoutes: RouteConfig[] = [
    {
        path: 'leagues',
        name: 'LeagueList',
        exact: true,
        Component: LeagueList,
        secured: true
    },
    {
        path: 'leagues/new',
        name: 'LeagueCreate',
        exact: true,
        Component: LeagueCreate,
        secured: true
    },
    {
        path: 'leagues/edit/',
        name: 'LeagueEdit',
        exact: true,
        Component: LeagueEdit,
        secured: true
    },
    {
        path: 'seasons',
        name: 'SeasonList',
        exact: true,
        Component: SeasonList,
        secured: true
    },
    {
        path: 'seasons/new',
        name: 'SeasonCreate',
        exact: true,
        Component: SeasonCreate,
        secured: true
    },
    {
        path: 'seasons/edit',
        name: 'SeasonEdit',
        exact: true,
        Component: SeasonEdit,
        secured: true
    },
    {
        path: 'teams',
        name: 'TeamList',
        exact: true,
        Component: TeamList,
        secured: true
    },
    {
        path: 'teams/new',
        name: 'TeamCreate',
        exact: true,
        Component: TeamCreate,
        secured: true
    },
    {
        path: 'teams/edit',
        name: 'TeamEdit',
        exact: true,
        Component: TeamEdit,
        secured: true
    },
    {
        path: 'players',
        name: 'PlayerList',
        exact: true,
        Component: PlayerList,
        secured: true
    },
    {
        path: 'players/new',
        name: 'PlayerCreate',
        exact: true,
        Component: PlayerCreate,
        secured: true
    },
    {
        path: 'players/edit',
        name: 'PlayerEdit',
        exact: true,
        Component: PlayerEdit,
        secured: true
    },
    {
        path: 'matches',
        name: 'MatchList',
        exact: true,
        Component: MatchList,
        secured: true
    },
    {
        path: 'matches/new',
        name: 'MatchCreate',
        exact: true,
        Component: MatchCreate,
        secured: true
    },
    {
        path: 'matches/edit',
        name: 'MatchEdit',
        exact: true,
        Component: MatchEdit,
        secured: true
    },
    {
        path: 'users/create',
        name: 'UserCreate',
        exact: true,
        Component: UserCreate,
        secured: true
    },
    {
        path: 'users/edit',
        name: 'UserEdit',
        exact: true,
        Component: UserEdit,
        secured: true
    },
    {
        path: 'users',
        name: 'UserList',
        exact: true,
        Component: UserList,
        secured: true
    },
    {
        path: 'test',
        name: 'Test',
        exact: true,
        Component: Test,
        secured: true
    }
];

/**
 * List of routes used in the private app.
 */
export const publicRoutes: RouteConfig[] = [
    {
        path: 'login',
        name: 'Login',
        exact: true,
        Component: AdminLogin,
        secured: false
    },
    {
        path: '/',
        name: 'Fixtures',
        exact: true,
        Component: Fixtures,
        secured: false
    },
    {
        path: '/match-report',
        name: 'MatchReport',
        exact: true,
        Component: MatchReport,
        secured: false
    },
    {
        path: '/team-stats',
        name: 'TeamStats',
        exact: true,
        Component: TeamStats,
        secured: false
    },
    {
        path: '/leaderboard',
        name: 'MatchReport',
        exact: true,
        Component: Leaderboard,
        secured: false
    },
    {
        path: '*',
        name: 'FourOhFour',
        exact: false,
        Component: () => <Navigate to={import.meta.env.VITE_DEFAULT_PUBLIC_ROUTE} replace />,
        secured: false
    }
];

/**
 * Map over and render routes + handle navigation.
 */
function Routing() {
    return <>
        <Routes>
            {/* Admin pages */}
            <Route path={adminPrefix} element={<AdminTemplate />}>
                {adminRoutes.map(({ path, Component, secured }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <RequireAuth secured={secured} redirectTo={path}>
                            <Component />
                        </RequireAuth>
                    }
                />
                ))}
            </Route>

            <Route path="/" element={<PublicTemplate />}>
                {publicRoutes.map(({ path, Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<Component />}
                    />
                ))}
            </Route>
            
        </Routes>
    </>;
}

export default Routing;
