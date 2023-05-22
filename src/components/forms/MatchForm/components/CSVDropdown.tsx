import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getTeams } from "../../../../api/teams";
import { Spinner } from "../../../common";
import { InputError, DropdownInput } from "../../../input";
import _ from "lodash";

interface TeamNameDropdownProps extends ImplementedDropdownProps {
  /**
   * The options to be displayed to the user.
   */
  data?: Player[];
}

const CSVDropdown = ({
  value,
  onChange,
  error,
  touched,
  required,
  disabled,
  asInput,
  data = [],
}: TeamNameDropdownProps) => {
  // Format player options so they are input compatible
  const playerOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    let _data = data.map((item: Player) => ({
      value: item.id.toString(),
      label: item.name,
    }));
    _data = _.orderBy(_data, ["label"]);

    return _data;
  }, [data]);

  const handleChange = (val: string) => {
    onChange(val);
  };

  return (
    <DropdownInput
      value={value}
      onChange={handleChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled}
      options={playerOptions}
      placeholder="Select Player"
      asInput
    />
  );
};

export default CSVDropdown;
