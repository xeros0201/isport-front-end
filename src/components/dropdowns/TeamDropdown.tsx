import { useMemo } from "react";
import { useQuery } from "react-query";
import { getTeams } from "../../api/teams";
import { Spinner } from "../common";
import { InputError, DropdownInput } from "../input";

const TeamDropdown = ({
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
  asInput,
}: ImplementedDropdownProps) => {
  const {
    error: fetchError,
    isLoading,
    data,
  } = useQuery(["getTeams"], async () => getTeams());

  // Format league options so they are input compatible
  const teamOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((league) => ({
      value: league.id.toString(),
      label: league.name,
    }));
  }, [data]);

  // If error fetching data
  if (fetchError) return <InputError error="Error fetching teams" touched />;

  return (
    <DropdownInput
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled}
      options={teamOptions}
      placeholder="Select Team"
      asInput={asInput}
      isFetching={isLoading}
    />
  );
};

export default TeamDropdown;
