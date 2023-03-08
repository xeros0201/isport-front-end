import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getTeams } from "../../../../api/teams";
import { Spinner } from "../../../common";
import { InputError, DropdownInput } from "../../../input";

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
  label,
  required,
  disabled,
  asInput,
  data = [],
}: TeamNameDropdownProps) => {
  // Format league options so they are input compatible
  const teamOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((item: Player) => ({
      value: item.id.toString(),
      label: item.name,
    }));
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
      options={teamOptions}
      placeholder="Select Team"
      asInput
    />
  );
};

export default CSVDropdown;
