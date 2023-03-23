import "./TextInput.scss";
import { InputError, InputLabel } from "../../input";
import { Icon } from "../../common";
import classNames from "classnames";

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
  variant?: 'primary' | 'login';
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
  icon,
  variant = 'primary'
}: TextInputProps) => {
  return (
    <div className={classNames({
      'textinput': true,
      'textinput--has-icon': icon,
      [`textinput--variant-${variant}`]: true
    })}>
      <InputLabel label={label} required={required} />
      <div className="textinput__input-wrap">
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          className={classNames({
            'textinput__input': true,
            'textinput__input--rounded': rounded
          })}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value || "")}
          disabled={disabled}
          placeholder={placeholder}
        />
        {icon && <Icon name={icon} />}
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default TextInput;
