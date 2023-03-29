import classNames from "classnames";
import Icon from "../Icon/Icon";
import Spinner from "../Spinner/Spinner";
import "./Button.scss";

type ButtonProps = {
  /**
   * The text to be rendered on the button.
   */
  label: string;
  /**
   * The function to be called when the button is pressed.
   */
  onClick: () => void;
  /**
   * To block further action and indicate an action is processing.
   */
  isLoading?: boolean;
  /**
   * Whether the button should be 100% width.
   */
  fullwidth?: boolean;
  /**
   * The preconfigured style to be added to the button.
   */
  type?: "primary" | "secondary" | "danger" | "disabled" | "transparent" | "outlined";
  /**
   * Whether the button is being used to submit a form.
   */
  isSubmit?: boolean;
  /**
   * Whether the button can be interacted with - prevents onClick from being called
   */
  isDisabled?: boolean;
  /**
   * Whether the button has rounded corners.
   */
  rounded?: boolean;
  /**
   * Modify button size
   */
  size?: "small" | "medium" | "large";
  /**
   * The icon to be shown inside the input field.
   */
  icon?: ReactIcon;
  /**
   * Set margin auto
   */
  marginAuto?: boolean;
  /**
   * Set margin left
   */
  marginLeft?: number;
};

/**
 * A button component with preconfigured styles.
 */
const Button = ({
  label,
  onClick,
  isLoading,
  fullwidth = false,
  type = "primary",
  isSubmit = false,
  isDisabled = false,
  rounded = true,
  size = "medium",
  icon,
  marginAuto = false,
  marginLeft,
}: ButtonProps) => {
  /**
   * Determine the status of the button.
   */
  const status = isLoading ? "loading" : isDisabled ? "disabled" : "active";

  /**
   * Conditionally render class names for styling.
   */
  const buttonClasses = classNames({
    button: true,
    "button--fullwidth": fullwidth,
    "button--rounded": rounded,
    [`button--${type}`]: true,
    [`button--${status}`]: true,
    [`button--${size}`]: true,
    "button--margin-auto": marginAuto,
  });

  return (
    <button
      disabled={isLoading || isDisabled}
      className={buttonClasses}
      onClick={isLoading || isDisabled ? undefined : onClick}
      type={isSubmit ? "submit" : undefined}
      style={{ marginLeft: `${marginLeft}px`}}
    >
      <Spinner size="tiny" />
      {icon && !isLoading && <Icon name={icon} />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
