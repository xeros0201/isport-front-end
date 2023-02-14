import "./Spinner.scss";

interface SpinnerProps {
  /**
   * Size of the spinner. Default is 'small'.
   */
  size?: "tiny" |"small" | "large";
}

/**
 * Component for displaying a loading spinner. Centered in the parent element.
 */
const Spinner = ({ size = "small" }: SpinnerProps) => {
  const sizeClass = "spinner--" + size;

  return (
    <div className={`spinner ${sizeClass}`}>
      <div className="spinner__inner"></div>
    </div>
  );
};

export default Spinner;
