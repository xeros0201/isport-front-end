import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { getTeamBySeasons } from "../../api/teams";
import { getTeams } from "../../api/teams";
import { InputError, DropdownInput } from "../input";

interface TeamDropdown extends ImplementedDropdownProps {
  requireSeason?: boolean;
  seasonId?: string;
}

const TeamDropdown = ({
  requireSeason = false,
  seasonId,
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
  asInput,
}: TeamDropdown) => {
  const {
    error: fetchError, isLoading, data, refetch } = useQuery(
      ["getTeams", { requireSeason, seasonId }],
      async (): Promise<Team[]> => {
        if (requireSeason && !seasonId) return [];
        if (requireSeason && seasonId) return getTeamBySeasons(+seasonId);
        return getTeams();
    }
  );

  // Fetch as soon as a seasonId is provided
  useEffect(() => {
    if (requireSeason && !seasonId) onChange('');
    if (!requireSeason && value) onChange(value);
    refetch();
  }, [seasonId, requireSeason]);

  // Format league options so they are input compatible
  const teamOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((team) => ({
      value: team.id.toString(),
      label: team.name,
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