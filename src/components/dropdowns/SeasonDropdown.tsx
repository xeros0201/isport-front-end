import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { getSeasons, getSeasonsByLeague } from "../../api/seasons";
import { InputError, DropdownInput } from "../input";

interface SeasonDropdown extends ImplementedDropdownProps {
  requireLeague?: boolean;
  leagueId?: string;
}

const SeasonDropdown = ({
  requireLeague = false,
  leagueId,
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled = false,
  asInput,
}: SeasonDropdown) => {
  const {
    error: fetchError,
    isLoading,
    data,
  } = useQuery(
    ["getSeasonsByLeague", { leagueId, requireLeague }],
    async (): Promise<Season[]> => {
      if (requireLeague && !leagueId) return [];
      if (requireLeague && leagueId) return getSeasonsByLeague(+leagueId);
      return getSeasons();
    }
  );

  // Set default if leagueaId changed
  useEffect(() => {
      onChange("");
  }, [leagueId]);

  // Set value season
  useEffect(() => {
      if(value) onChange(value);
  }, [value]);

  // Format season options so they are input compatible
  const seasonOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((season) => ({
      value: season.id.toString(),
      label: season.name,
    }));
  }, [data]);

  // If error fetching data
  if (fetchError && leagueId)
    return <InputError error="Error fetching seasons" touched />;

  return (
    <DropdownInput
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled || (requireLeague && !leagueId)}
      options={seasonOptions}
      placeholder="Select Season"
      asInput={asInput}
      isFetching={isLoading}
    />
  );
};

export default SeasonDropdown;
