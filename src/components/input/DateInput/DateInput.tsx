import { InputError, InputLabel } from "../../input";
import DatePicker from "react-datepicker";
import { IoCalendarClearOutline } from "react-icons/io5";
import "./DateInput.scss";

const DateInput = ({
  label,
  required,
  error,
  touched,
  value,
  onChange,
}: InputProps) => {
  const handleChange = (date: null | Date) => {
    if (!date) return;

    onChange(date.toISOString());
  };

  return (
    <div className="dateinput">
      <InputLabel label={label} required={required} />
      <div className="dateinput__input-wrap">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={value !== undefined ? new Date(value) : undefined}
          onChange={handleChange}
          className="dateinput__input"
          placeholderText="DD-MM-YYYY"
        />
        <IoCalendarClearOutline className="dateinput__icon" />
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default DateInput;
