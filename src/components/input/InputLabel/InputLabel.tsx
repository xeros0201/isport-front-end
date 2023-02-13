import "./InputLabel.scss";

/**
 * The label used for input components.
 */
const InputLabel = ({ label, required = false }: InputLabelProps) => {
  /**
   * Return nothing if label wasn't provided;
   */
  if (!label) {
    return null;
  }

  return (
    <div className="inputlabel">
      {required && <div className="inputlabel__required">*</div>}
      <label className="inputlabel__label">{label}</label>
    </div>
  );
};

export default InputLabel;
