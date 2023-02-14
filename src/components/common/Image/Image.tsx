import "./Image.scss";

type ImageProps = {
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
   * Image's width. default height is 132px
   */
  width?: number;
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

const Image = ({
  url,
  height = 64,
  width = 132,
  alt = "img",
  isSquare,
}: ImageProps) => {
  const size = () =>
    isSquare
      ? {
          width: height,
          height: height,
        }
      : {
          width: width,
          height: height,
        };

  return (
    <img
      className={`image ${isSquare && "image--square"}`}
      src={url}
      width={size().width}
      height={size().height}
      alt={alt}
    />
  );
};

export default Image;
