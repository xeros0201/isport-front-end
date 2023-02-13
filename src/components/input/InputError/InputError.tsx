import "./InputError.scss";

/**
 * An error message component to be displayed when input fields fail validation.
 * Handles it's own visibility logic based on property values.
 */
const InputError = ({ error = "", touched = false }: InputErrorProps) => {
  // If component has an error message and has been interacted with
  if (error && touched) {
    return <span className="inputerror">{error}</span>;
  }

  return null;
};

export default InputError;
