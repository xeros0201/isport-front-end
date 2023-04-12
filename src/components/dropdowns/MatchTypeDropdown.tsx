import { useMemo } from "react";
import { MatchType } from "../../types/enums";
import { DropdownInput } from "../input";

// export const MatchType = {
//   REGULAR: "REGULAR",
//   QUARTER_FINAL: "QUARTER_FINAL",
//   SEMI_FINAL: "SEMI_FINAL",
//   FINAL: "FINAL",
// };

const data = [
  {
    id: MatchType.FINAL,
    name: "FINAL",
  },
  {
    id: MatchType.QUARTER_FINAL,
    name: "QUARTER FINAL",
  },
  {
    id: MatchType.REGULAR,
    name: "REGULAR",
  },
  {
    id: MatchType.SEMI_FINAL,
    name: "SEMI FINAL",
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
