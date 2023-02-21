import { ReactNode } from "react";
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
  type?: "primary" | "secondary" | "danger" | "disabled" | "transparent";
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

  icon?: ReactNode;
  className?: string;
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
  icon,
  className,
}: ButtonProps) => {
  /**
   * Determine the status of the button.
   */
  const status = isLoading ? "loading" : isDisabled ? "disabled" : "active";

  /**
   * Conditionally render class names for styling.
   */
  const typeModifier = `button--${type}`;
  const fullwidthModifier = fullwidth ? "button--fullwidth" : "";
  const roundedModifier = rounded ? "button--rounded" : "";
  const statusModifier = `button--${status}`;

  return (
    <button
      disabled={isLoading || isDisabled}
      className={`button ${typeModifier} ${fullwidthModifier} ${roundedModifier} ${statusModifier} ${className}`}
      onClick={isLoading || isDisabled ? undefined : onClick}
      type={isSubmit ? "submit" : undefined}
    >
      <Spinner />
      {icon && icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;
