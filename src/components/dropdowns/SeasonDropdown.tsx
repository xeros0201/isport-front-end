<<<<<<< HEAD
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getSeasons } from "../../api/seasons";
import { Spinner } from "../common";
import { InputError, DropdownInput } from "../input";

const SeasonDropdown = ({
=======
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
>>>>>>> remotes/origin/develop
    value,
    onChange,
    error,
    touched,
    label,
    required,
    disabled,
    asInput
<<<<<<< HEAD
}: ImplementedDropdownProps) => {
    const { error: fetchError, isLoading, data } = useQuery(['getSeasons'], async () => getSeasons());
=======
}: SeasonDropdown) => {
    const { error: fetchError, isLoading, data, refetch } = useQuery(
        ['getSeasonsByLeague', { leagueId, requireLeague }],
        async (): Promise<Season[]> => {
            if (requireLeague && !leagueId) return [];
            if (requireLeague && leagueId) return getSeasonsByLeague(+leagueId);
            return getSeasons();
        }
    );

    // Fetch as soon as a leagueId is provided
    useEffect(() => {
        if (requireLeague && !leagueId) onChange('');
        if (!requireLeague && value) onChange(value);
        refetch();
    }, [leagueId, requireLeague]);
>>>>>>> remotes/origin/develop

    // Format season options so they are input compatible
    const seasonOptions: InputOption[] = useMemo(() => {
        if (!data) return [];

        return data.map((season) => ({
            value: season.id.toString(),
            label: season.name
        }));
    }, [data]);

    // If error fetching data
<<<<<<< HEAD
    if (fetchError) return <InputError error="Error fetching seasons" touched />;
=======
    if (fetchError && leagueId) return <InputError error="Error fetching seasons" touched />;
>>>>>>> remotes/origin/develop

    return (
        <DropdownInput
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            touched={touched}
            required={required}
<<<<<<< HEAD
            disabled={disabled}
=======
            disabled={disabled || (requireLeague && !leagueId)}
>>>>>>> remotes/origin/develop
            options={seasonOptions}
            placeholder="Select Season"
            asInput={asInput}
            isFetching={isLoading}
        />
    );
};

export default SeasonDropdown;