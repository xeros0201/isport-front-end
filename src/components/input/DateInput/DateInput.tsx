import "./DateInput.scss";
import { InputError, InputLabel } from "../../input";

import React, { ReactNode, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";

// import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
//import "react-datepicker/dist/react-datepicker-cssmodules.css";
interface TextInputProps extends InputProps {
  /**
   * Placeholder text inside dropdown
   */
  placeholder?: string;

  value?: Date;
}

function DateInput({
  label,
  required,
  error,
  touched,
  value,
  onChange,
}: TextInputProps) {
  const [startDate, setStartDate] = useState<Date | null | undefined>(value);

  useEffect(() => {
    setStartDate(value);
  }, [value]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <InputLabel label={label} required={required} />
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);

          if (date !== undefined && date !== null) {
            onChange(date.toString());
          }
        }}
        className="dateinput__datepicker"
        placeholderText="DD-MM-YYYY"
      />
      <FaCalendar
        className={`dateinput__icon${label !== undefined ? " with_label" : ""}`}
      />
      <InputError error={error} touched={touched} />
    </div>
  );
}

export default DateInput;
