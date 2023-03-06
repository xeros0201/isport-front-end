import ReactDropdown from "react-dropdown";
import { Spinner } from "../../common";
import InputError from "../InputError/InputError";
import InputLabel from "../InputLabel/InputLabel";
import "./DropdownInput.scss";

interface DropdownInputProps
  extends InputWithOptionsProps,
    AsInputProps,
    AsyncOptionsInputProps {
  /**
   * Placeholder text inside dropdown
   */
  placeholder?: string;
}

/**
 * A Dropdown component wrapped around react-dropdown
 */
function DropdownInput({
  value,
  options = [],
  placeholder,
  onChange,
  label,
  required,
  disabled,
  error,
  touched,
  isFetching,
  asInput = false,
}: DropdownInputProps) {
  const asInputClass = `dropdowninput--${
    asInput ? "as-input" : "not-as-input"
  }`;
  return (
    <div className={`dropdowninput ${asInputClass}`}>
      {asInput && <InputLabel label={label} required={required} />}
      {!isFetching && (
        <ReactDropdown
          className="reactdropdown"
          options={options}
          value={value}
          placeholder={placeholder ?? ""}
          onChange={(e) => onChange(e.value)}
          disabled={disabled}
        />
      )}
      {isFetching && (
        <div className="dropdowninput__spinner">
          <Spinner size="tiny" />
        </div>
      )}
      {asInput && <InputError error={error} touched={touched} />}
    </div>
  );
}

export default DropdownInput;
