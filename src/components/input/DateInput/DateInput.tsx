import "./DateInput.scss";
import { InputError, InputLabel } from "../../input";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";

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
          selected={value ? new Date(value) : null}
          onChange={handleChange}
          className="dateinput__input"
          placeholderText="DD-MM-YYYY"
        />
        <FaCalendar className="dateinput__icon" />
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default DateInput;
