import { Routes, Route } from 'react-router-dom';
// import RequireAuth from './RequireAuth';
import MatchReport from '../../pages/public/MatchReport/MatchReport';
import FourOhFour from '../../pages/public/FourOhFour/FourOhFour';
import AdminLogin from '../../pages/admin/AdminLogin/AdminLogin';
import AdminTemplate from '../templates/AdminTemplate/AdminTemplate';
import PublicTemplate from '../templates/PublicTemplate/PublicTemplate';
import Leaderboard from '../../pages/public/Leaderboard/Leaderboard';
import TeamStats from '../../pages/public/TeamStats/TeamStats';
import Fixtures from '../../pages/public/Fixtures/Fixtures';
import LeaguesList from '../../pages/admin/LeaguesList/LeaguesList';
import Test from '../../pages/admin/Test/Test';
import LeaguesCreate from '../../pages/admin/LeaguesCreate/LeaguesCreate';
import LeaguesEdit from '../../pages/admin/LeaguesEdit/LeaguesEdit';

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
        path: 'login',
        name: 'Login',
        exact: true,
        Component: AdminLogin,
        secured: false
    },
    {
        path: 'leagues',
        name: 'LeaguesList',
        exact: true,
        Component: LeaguesList,
        secured: true
    },
    {
        path: 'leagues/new',
        name: 'LeaguesCreate',
        exact: true,
        Component: LeaguesCreate,
        secured: true
    },
    {
        path: 'leagues/edit/',
        name: 'LeaguesEdit',
        exact: true,
        Component: LeaguesEdit,
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
        path: 'leaderboard',
        name: 'MatchReport',
        exact: true,
        Component: Leaderboard,
        secured: false
    },
    {
        path: '*',
        name: 'FourOhFour',
        exact: false,
        Component: FourOhFour,
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
            <Route path="admin" element={<AdminTemplate />}>
                {adminRoutes.map(({ path, Component, secured }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        // <RequireAuth secured={secured} redirectTo={path}>
                            <Component />
                        // </RequireAuth>
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
