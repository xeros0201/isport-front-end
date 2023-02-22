import "./Logo.scss";

type LogoProps = {
  /**
   * Image's url.
   */
  url: string;
  /**
   * Image's height. default height is 32px
   */
  height: number;
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
};

const Logo = ({
  url,
  height = 64,
  alt = "img",
  isSquare = false,
}: LogoProps) => {
  return (
    <img
      className={`image ${isSquare ? "image--square" : ""}`}
      src={url}
      width={isSquare ? height : 'auto'}
      height={height}
      alt={alt}
    />
  );
};

export default Logo;
