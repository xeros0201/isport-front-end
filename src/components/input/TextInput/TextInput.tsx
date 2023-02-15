import "./TextInput.scss";
import { InputError, InputLabel } from "../../input";
import { FaCalendar, FaSearch } from "react-icons/fa";

interface TextInputProps extends InputProps, FocusProps<HTMLInputElement> {
  /**
   * The type of text input. The default is 'text'.
   */
  type?: "text" | "password" | "email";
  /**
   * Text to be shown inside the input field when it is empty.
   */
  placeholder?: string;
  /**
   *
   */
  rounded?: boolean;
  iconUrl?: string;
  iconsize?: number;
}

/**
 * Text input component with preconfigured styling.
 */
const TextInput = ({
  label,
  value,
  onChange,
  touched,
  error,
  type = "text",
  required,
  onFocus,
  onBlur,
  placeholder = "",
  disabled = false,
  rounded = false,
  iconUrl,
  iconsize = 18,
}: TextInputProps) => {
  return (
    <div className="textinput">
      <InputLabel label={label} required={required} />
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        className={`textinput__input ${
          rounded ? "textinput__input--rounded" : ""
        }`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value || "")}
        disabled={disabled}
        placeholder={placeholder}
      />
      {iconUrl && (
        <img
          className="textinput__icon"
          src={iconUrl}
          width={iconsize}
          height={iconsize}
        />
      )}
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default TextInput;
