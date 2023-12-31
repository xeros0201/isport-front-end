import { InputError, InputLabel } from "../../input";
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import "./DateInput.scss";
import { Icon } from "../../common";
import dayjs from "dayjs";

function convertUTCToLocalDate(_date: string) {
  let date = new Date(_date);
  date = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  return date;
}

function convertLocalToUTCDate(date: Date, initialValue: string) {
  if (!date) {
    return date;
  }
  date = new Date(date);
  const initDate = new Date(initialValue);
  date = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      initDate.getUTCHours(),
      initDate.getUTCMinutes(),
      initDate.getUTCSeconds()
    )
  );
  return date;
}

interface DateInputProps
  extends Omit<ReactDatePickerProps, "onChange">,
    InputProps {}

const DateInput = ({
  label,
  required,
  error,
  touched,
  value,
  onChange,
  onBlur,
}: DateInputProps) => {
  const handleChange = (date: null | Date) => {
    if (!date) return;
    onChange(convertLocalToUTCDate(date, value as string).toISOString());
  };

  return (
    <div className="dateinput">
      <InputLabel label={label} required={required} />
      <div className="dateinput__input-wrap">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={
            value !== undefined ? convertUTCToLocalDate(value) : undefined
          }
          onChange={handleChange}
          className="dateinput__input"
          placeholderText="DD-MM-YYYY"
          onFocus={onBlur}
        />
        <Icon name="IoCalendarClearOutline" />
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default DateInput;
