import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="header__container">
                <img
                    className="header__logo"
                    src="/public/isports.png"
                    onClick={() => navigate('/admin/leagues')}
                />
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