import "./DateInput.scss";
import { InputError, InputLabel } from "../../input";

import React, { ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCalendar } from "react-icons/fa";

// import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
//import "react-datepicker/dist/react-datepicker-cssmodules.css";
interface DateInputProps extends InputWithOptionsProps {
  /**
   * Placeholder text inside dropdown
   */
  placeholder?: string;
  /**
   * Selected item; can set default item selected
   */
  value?: string;

  icon?: ReactNode;
}

function DateInput({ label, required, error, touched, icon }: DateInputProps) {
  const [startDate, setStartDate] = useState<Date | null>();

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <InputLabel label={label} required={required} />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="DateInput__datepicker"
        placeholderText="DD-MM-YYYY"
      />
      {icon === undefined ? <FaCalendar className="DateInput__icon" /> : icon}
      <InputError error={error} touched={touched} />
    </div>
  );
}

export default DateInput;
