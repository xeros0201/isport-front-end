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
};

/**
 * A component to wrap the form html element for consistant
 * styling across the web app.
 */
const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      className="form"
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
