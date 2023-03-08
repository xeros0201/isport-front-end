import { useMemo } from "react";
import { useQuery } from "react-query";
import { getTeams } from "../../api/teams";
import { Spinner } from "../common";
import { InputError, DropdownInput } from "../input";

const data = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
];

const RoundDropdown = ({
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
  asInput,
}: ImplementedDropdownProps) => {
  // Format league options so they are input compatible
  const roundOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((round) => ({
      value: round.id.toString(),
      label: round.name,
    }));
  }, [data]);

  return (
    <DropdownInput
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled}
      options={roundOptions}
      placeholder="Select Round"
      asInput={asInput}
    />
  );
};

export default RoundDropdown;
