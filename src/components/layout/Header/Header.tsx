import { NavLink } from 'react-router-dom';
import './Header.scss';

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
}

const Header = ({ links }: HeaderProps) => {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__logo">Logo</div>
                <nav className="header__nav">
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                                {('to' in link)
                                    ? (
                                        <NavLink to={link.to} className={({ isActive }) => (
                                            isActive
                                                ? "header__navlink header__navlink--active"
                                                : "header__navlink"
                                        )}>
                                            {link.label}
                                        </NavLink>
                                    )
                                    : (
                                        <a className="header__navlink" onClick={link.onClick}>
                                            {link.label}
                                        </a>
                                    )
                                }
                                
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;