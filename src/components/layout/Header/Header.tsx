import "./Header.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavigationDropdown } from "../../dropdowns";
import { useComponentDimensions } from "../../../hooks";
const defaultAdminPage = import.meta.env.VITE_DEFAULT_ADMIN_ROUTE

interface HeaderProps {
  menu: Menu;
  children?: React.ReactNode | React.ReactNode[];
  collapseWidth?: number
}

const Header = ({ menu, children, collapseWidth = 630 }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    ref: containerRef,
    width: containerWidth,
    height: containerHeight,
  } = useComponentDimensions();

  const { pathname } = location;

  const isCurrentRoute = (routeToCheck: string) => {
    const adminPathname = `${import.meta.env.VITE_ADMIN_PREFIX}${pathname}`;
    if (pathname === routeToCheck && routeToCheck === '/') return true;
    if (pathname.includes(routeToCheck) && routeToCheck !== '/') return true;
    if (adminPathname.includes(routeToCheck) && routeToCheck !== '/') return true;
  }

  const renderDesktopNav = () => {
    return (
      <nav className="header__nav-desktop">
        <ul>
          {menu.map((link, index) => (
            <li key={index}>
                <NavLink
                  to={link.path}
                  className={() =>
                    isCurrentRoute(link.path)
                      ? "header__navlink header__navlink--active"
                      : "header__navlink"
                  }
                >
                  {link.label}
                </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  const renderMobileNav = () => {
    return (
      <div className="header__nav-mobile">
        <NavigationDropdown menu={menu} />
      </div>
    )
  }

  return (
    <div className="header">
      <div className="header__container" ref={containerRef}>
        <div className="header__logo" onClick={() => navigate(defaultAdminPage)}>
          <img src="/public/isports.png" />
        </div>
        {containerWidth > collapseWidth 
          ? renderDesktopNav()
          : renderMobileNav()
        }
        {children}
      </div>
    </div>
  );
};

export default Header;
