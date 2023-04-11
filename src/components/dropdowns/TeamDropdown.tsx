import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "react-query";
import { getTeamBySeasons } from "../../api/teams";
import { getTeams } from "../../api/teams";
import { InputError, DropdownInput } from "../input";

interface TeamDropdown extends ImplementedDropdownProps {
  requireSeason?: boolean;
  seasonId?: string;
  filter?: (value: Team, index: number, array: Team[]) => boolean;
}

const TeamDropdown = ({
  requireSeason = false,
  seasonId,
  filter,
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
    error: fetchError,
    isLoading,
    data,
    refetch,
  } = useQuery(
    ["getTeams", { requireSeason, seasonId }],
    async (): Promise<Team[]> => {
      if (requireSeason && !seasonId) return [];
      if (requireSeason && seasonId) return getTeamBySeasons(+seasonId);
      return getTeams();
    }
  );

  // Fetch as soon as a seasonId is provided
  useEffect(() => {
    // if (requireSeason && !seasonId) onChange("");
    if (!requireSeason && value) onChange(value);
    refetch();
  }, [requireSeason, value]);

  // Format league options so they are input compatible
  const teamOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    let _data = filter ? data.filter(filter) : data;

    const allTeam : Team = {
      id: 0,
      name: "All Teams",
      logo: "",
      seasonId: seasonId ? +seasonId : 0,
      season: _data[0].season,
    }
    _data = [allTeam, ..._data];
    return _data.map((team) => ({
      value: team.id.toString(),
      label: team.name,
    }));
  }, [data, filter, seasonId]);

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
