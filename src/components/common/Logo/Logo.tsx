import classNames from "classnames";
import "./Logo.scss";

type LogoProps = {
  /**
   * Image's url.
   */
  url: string;
  /**
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
   * 
   * @optional
   * disable center & full width
  */
  disableCenter?: boolean;
};

const Logo = ({
  url,
  height = 64,
  alt = "img",
  isSquare = false,
  disableCenter = false
}: LogoProps) => {
  const logoClasses = classNames({
    "logo": true,
    "logo--square": isSquare
  });

  const logoStyles: React.CSSProperties = {
    height: height,
    width: isSquare ? height : 'auto',
    display: disableCenter ? 'inline-flex' : 'flex'
  }

  return (
    <div className={logoClasses} style={logoStyles} >
      <img
        src={url}
        height={height}
        alt={alt}
      />
    </div>
  );
};

export default Logo;
