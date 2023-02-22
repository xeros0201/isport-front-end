import { useEffect } from "react";
import InputError from "../InputError/InputError";
import InputLabel from "../InputLabel/InputLabel";
import "./CheckboxInput.scss";

interface CheckboxInputProps extends InputProps {
  checkboxLabel: string;
}

const CheckboxInput = ({
  label,
  onChange,
  /**
   * Value must be either 'true' or ''.
   * This is to work around Formik's default of storing form values as strings.
   */
  value,
  touched,
  error,
  required,
  checkboxLabel,
}: CheckboxInputProps) => {
  // Convert any provided value to 'true'
  useEffect(() => {
    if (!!value && value !== "true") {
      onChange("true");
    }
  }, [value]);

  const onCheck = () => {
    onChange(!!value ? "" : "true");
  };

  return (
    <div className="checkbox">
      <InputLabel label={label} required={required} />
      <div className="checkbox__input-wrap" onClick={onCheck}>
        <input
          className="checkbox__input"
          value={value}
          type="checkbox"
          checked={!!value}
        />
        <span className="checkbox__label">{checkboxLabel}</span>
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default CheckboxInput;
