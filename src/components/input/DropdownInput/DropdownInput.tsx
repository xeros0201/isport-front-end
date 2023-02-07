import ReactDropdown from "react-dropdown";
import "./DropdownInput.scss";

interface DropdownInputProps extends InputWithOptionsProps {
  /**
   * Placeholder text inside dropdown
   */
  placeholder?: string;
  /**
   * Selected item; can set default item selected
   */
  value?: string;
}

/**
 * A Dropdown component wrapped around react-dropdown
 */
function DropdownInput({
  value,
  options = [],
  placeholder,
  onChange,
}: DropdownInputProps) {
  return (
    <ReactDropdown
      className="reactdropdown"
      options={options}
      value={value}
      placeholder={placeholder ?? ""}
      onChange={(e) => onChange(e.value)}
    />
  );
}

export default DropdownInput;
