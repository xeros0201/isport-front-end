import "./NumberInput.scss";
import { InputError, InputLabel } from "..";
import { Icon } from "../../common";
import classNames from "classnames";

interface NumberInputProps extends InputProps, FocusProps<HTMLInputElement> {
  /**
   * Text to be shown inside the input field when it is empty.
   */
  placeholder?: string;
  /**
   *
   */
  rounded?: boolean;
  /**
   *
   */
  onlyInteger?: boolean;
  /**
   * The icon to be shown inside the input field.
   */
  icon?: ReactIcon;
}

/**
 * Text input component with preconfigured styling.
 */
const NumberInput = ({
  label,
  value,
  onChange,
  touched,
  error,
  required,
  onFocus,
  onBlur,
  placeholder = "",
  disabled = false,
  rounded = false,
  onlyInteger = false,
  icon,
}: NumberInputProps) => {
  const handleKeyDown = (e: {
    keyCode: number;
    preventDefault: () => void;
  }) => {
    const { keyCode } = e;
    const codes = [
      190, // .
      69, // e (scientific notaion, 1e2 === 100)
    ];
    if (
      onlyInteger &&
      (codes.includes(e.keyCode) ||
        (keyCode > 31 && (keyCode < 48 || keyCode > 57)))
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  return (
    <div
      className={classNames({
        numberinput: true,
        "numberinput--has-icon": icon,
      })}
    >
      <InputLabel label={label} required={required} />
      <div className="numberinput__input-wrap">
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          className={classNames({
            numberinput__input: true,
            "numberinput__input--rounded": rounded,
          })}
          type={"number"}
          value={value}
          onChange={(e) => onChange(e.target.value || "")}
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
        {icon && <Icon name={icon} />}
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default NumberInput;
