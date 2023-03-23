import classNames from "classnames";
import "./Logo.scss";

type LogoProps = {
  /**
   * Image's url.
   */
  url: string;
  /**
   * @optional
   * Image's height. default height is 32px
   */
  height?: number;
  /**
   * @optional
   * Image's alt. default alt is "img"
   */
  alt?: string;
  /**
   * @optional
   * Make image square (width value is same with height). Image
   also align center.
   */
  isSquare?: boolean;
  /**
   * @optional
   * Display a label next to the logo.
   */
  label?: string;
};

const Logo = ({
  url,
  height = 54,
  alt = "img",
  isSquare = false,
  label
}: LogoProps) => {
  const logoClasses = classNames({
    "logo": true,
    "logo--square": isSquare,
    "logo--with-label": label,
  });

  const logoStyles: React.CSSProperties = {
    height: height,
    width: isSquare ? height : 'auto'
  }

  if ((!url || url === "null") && !label) return null;

  return (
    <div className={logoClasses} style={logoStyles} >
      {(url && url !== "null") && <img
        className="logo__img"
        src={url}
        height={height}
        alt={alt}
      />}
      {label && (
        <p className="logo__label">{label}</p>
      )}
    </div>
  );
};

export default Logo;
