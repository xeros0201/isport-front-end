import { useState } from "react";
import { InputError, InputLabel } from "../../input";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";
import "./DateInput.scss";

const DateInput = ({
  label,
  required,
  error,
  touched,
  value,
  onChange,
}: InputProps) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date())

  const handleChange = (date: null | Date) => {
    if (!date) return;

    setDate(date);
    onChange(date.toISOString());
  };

  return (
    <div className="dateinput">
      <InputLabel label={label} required={required} />
      <div className="dateinput__input-wrap">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={handleChange}
          className="dateinput__input-wrap--picker"
          placeholderText="DD-MM-YYYY"
        />
        <FaCalendar className="dateinput__input-wrap--icon" />
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default DateInput;
