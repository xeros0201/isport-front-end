import { NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { NavigationDropdown } from "../../dropdowns";

interface RouteLink {
  label: string;
  to: string;
}
interface onClickLink {
  label: string;
  onClick: () => void;
}

interface HeaderProps {
  links: (RouteLink | onClickLink)[];
  children?: React.ReactNode | React.ReactNode[];
}

const Header = ({ links, children }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const isCurrentRoute = (routeToCheck: string) => {
    const adminPathname = `${import.meta.env.VITE_ADMIN_PREFIX}${pathname}`;
    if (pathname === routeToCheck && routeToCheck === '/') return true;
    if (pathname.includes(routeToCheck) && routeToCheck !== '/') return true;
    if (adminPathname.includes(routeToCheck) && routeToCheck !== '/') return true;
  }

  return (
    <div className="header">
      <div className="header__container">
        <img
          className="header__logo"
          src="/public/isports.png"
          onClick={() => navigate("/admin/leagues")}
        />
        <nav className="header__nav">
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                {"to" in link ? (
                  <NavLink
                    to={link.to}
                    className={() =>
                      isCurrentRoute(link.to)
                        ? "header__navlink header__navlink--active"
                        : "header__navlink"
                    }
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <a className="header__navlink" onClick={link.onClick}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </div>
    </div>
  );
};

export default Header;
