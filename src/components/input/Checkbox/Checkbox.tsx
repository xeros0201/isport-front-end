import { useState } from "react";
import InputError from "../InputError/InputError";
import InputLabel from "../InputLabel/InputLabel";
import "./Checkbox.scss";

interface CheckboxProps
  extends InputCheckboxProps,
    FocusProps<HTMLInputElement> {
  /**
   * @optional
   * Add label after checkbox
   */
  label?: string;
  /**
   * @optional
   * Set init checked value / default value is false
   */
  isChecked?: boolean;
  /**
   * @optional
   * Set checkbox value
   */
  value?: string;
  /**
   * Return checkbox isChecked value and string value
   */
  onChange: (isChecked: boolean, value?: string) => void;
}

const Checkbox = ({
  label,
  onChange = () => {},
  isChecked = false,
  value,
  touched,
  error,
  required,
}: CheckboxProps) => {
  const [isCheckedValue, setIsCheckedValue] = useState(isChecked);

  const onCheck = () => {
    setIsCheckedValue(!isCheckedValue);
    onChange(!isCheckedValue, value);
  };

  return (
    <div className="checkbox">
      <button className="checkbox" onClick={onCheck}>
        <InputLabel label={label} required={required} />
        <input value={value} type="checkbox" checked={isCheckedValue} />
        <span className="checkmark"></span>
        <InputError error={error} touched={touched} />
      </button>
    </div>
  );
};

export default Checkbox;
