import { InputError, InputLabel } from "..";
import DatePicker from "react-datepicker";
import "./TimeInput.scss";
import { Icon } from "../../common";
import { InputHTMLAttributes, useEffect, useState } from "react";
import dayjs from "dayjs";

const TimeInput = ({
  label,
  required,
  error,
  touched,
  value,
  onChange,
}: InputProps) => {
  const [time, setTime] = useState<{
    [key: string]: string | number | undefined;
  }>({});

  useEffect(() => {
    const date = dayjs(value).utc().format("hh-mm-A");
    const [h, m, a] = date.split("-");

    setTime({ h: +h > 11 ? +h - 12 : +h, m: +m, a });
  }, [value]);

  const handleChange = (newTime: {
    [key: string]: string | number | undefined;
  }) => {
    let newDate = dayjs(value).utc();

    if (Object.keys(newTime).length) {
      if (newTime.h)
        newDate = newDate.hour(+newTime.h + (newTime.a === "AM" ? 0 : 12));
      if (newTime.m) newDate = newDate.minute(+newTime.m);
    }
    if (!newDate) return;

    if (!newDate.isSame(dayjs(value).utc()))
      onChange(newDate.toDate().toISOString());
  };

  useEffect(() => {
    const container: any =
      document.getElementsByClassName("timeinput__input")[0];
    container.onkeyup = function (e: any) {
      var target = e.srcElement;
      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;

      if (myLength >= maxLength) {
        var next = target;
        while ((next = next.nextElementSibling)) {
          if (next == null) break;
          if (next.tagName.toLowerCase() == "input") {
            next.focus();
            break;
          }
        }
      }
    };
  }, []);

  const handleInput = (e: any) => {
    const max = parseInt(e.target.attributes["max"].value, 10);

    if (e.target.value > max) {
      e.target.value = e.target.value.slice(0, 1);
      // onChange();
    }
    const newTime = { ...time, [e.target.name]: e.target.value };
    setTime(newTime);
    handleChange(newTime);
  };

  return (
    <div className="timeinput">
      <InputLabel label={label} required={required} />
      <div className="timeinput__input-wrap">
        <div className="timeinput__input">
          <input
            type="number"
            maxLength={2}
            max={11}
            onInput={handleInput}
            value={time.h}
            name="h"
          />
          <span>:</span>
          <input
            type="number"
            maxLength={2}
            max={59}
            onInput={handleInput}
            value={time.m}
            name="m"
          />
        </div>
        <div className="timeinput__button">
          {[
            {
              label: "AM",
              value: "AM",
            },
            {
              label: "PM",
              value: "PM",
            },
          ].map((item) => {
            const isActive = time.a === item.value;
            return (
              <button
                type="button"
                onClick={() => {
                  const newTime = { ...time, a: item.value };
                  setTime(newTime);
                  handleChange(newTime);
                }}
                key={item.label}
                className={isActive ? "active" : ""}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
};

export default TimeInput;
