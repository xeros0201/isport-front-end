import { useMemo } from "react";
import { useQuery } from "react-query";
import { getTeams } from "../../api/teams";
import { Spinner } from "../common";
import { InputError, DropdownInput } from "../input";

enum MatchType {
  REGULAR = "REGULAR",
  QUARTER_FINAL = "QUARTER FINAL",
  SEMI_FINAL = "SEMI FINAL",
  FINAL = "FINAL",
}

const data = [
  {
    id: "FINAL",
    name: MatchType.FINAL,
  },
  {
    id: "QUARTER_FINAL",
    name: MatchType.QUARTER_FINAL,
  },
  {
    id: "REGULAR",
    name: MatchType.REGULAR,
  },
  {
    id: "SEMI_FINAL",
    name: MatchType.SEMI_FINAL,
  },
];

const MatchTypeDropdown = ({
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
  asInput,
}: ImplementedDropdownProps) => {
  // Format matchType options so they are input compatible
  const matchTypeOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((matchType) => ({
      value: matchType.id.toString(),
      label: matchType.name,
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
      options={matchTypeOptions}
      placeholder="Select Match Type"
      asInput={asInput}
    />
  );
};

export default MatchTypeDropdown;
