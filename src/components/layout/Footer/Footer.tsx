import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__logo">Logo</div>
                <small className="footer__copyright">&copy; Copyright iSports Solutions {new Date().getFullYear()}</small>
            </div>
        </footer>
    );
}

export default Footer;