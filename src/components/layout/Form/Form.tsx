import classNames from "classnames";
import "./Form.scss";

type FormProps = {
  /**
   * The child components of the form (i.e. inputs).
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * The function to be envoked when submitting the form.
   */
  onSubmit: () => void;
  fullWidth?: boolean;
};

/**
 * A component to wrap the form html element for consistant
 * styling across the web app.
 */
const Form = ({ children, fullWidth, onSubmit }: FormProps) => {
  return (
    <form
      className={classNames({
        "form": true,
        "form--full-width": fullWidth
      })}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
