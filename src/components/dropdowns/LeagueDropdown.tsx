import { useMemo } from "react";
import { useQuery } from "react-query";
import { getLeagues } from "../../api/leagues";
import { Spinner } from "../common";
import { InputError } from "../input";
import DropdownInput from "../input/DropdownInput/DropdownInput";

const LeagueDropdown = ({
    value,
    onChange,
    error,
    touched,
    label,
    required,
    disabled,
    asInput
}: ImplementedDropdownProps) => {
    const { error: fetchError, isLoading, data } = useQuery(['getLeagues'], async () => getLeagues());

    // Format league options so they are input compatible
    const leagueOptions: InputOption[] = useMemo(() => {
        if (!data) return [];

        return data.map((league) => ({
            value: league.id.toString(),
            label: league.name
        }));
    }, [data]);

    // If error fetching data
    if (fetchError) return <InputError error="Error fetching leagues" touched />;

    return (
        <DropdownInput
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            touched={touched}
            required={required}
            disabled={disabled}
            options={leagueOptions}
            placeholder="Select League"
            asInput={asInput}
            isFetching={isLoading}
        />
    );
};

export default LeagueDropdown;