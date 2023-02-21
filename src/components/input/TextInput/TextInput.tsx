import "./TextInput.scss";
import { InputError, InputLabel } from "../../input";
import { Icon } from "../../common";

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
  /**
   * The icon to be shown inside the input field.
   */
  icon?: ReactIcon;
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
  icon
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
      {icon && <Icon name={icon} />}
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default TextInput;
