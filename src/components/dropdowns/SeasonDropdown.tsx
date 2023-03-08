import { useMemo } from "react";
import { useQuery } from "react-query";
import { getSeasons } from "../../api/seasons";
import { Spinner } from "../common";
import { InputError, DropdownInput } from "../input";

const SeasonDropdown = ({
    value,
    onChange,
    error,
    touched,
    label,
    required,
    disabled,
    asInput
}: ImplementedDropdownProps) => {
    const { error: fetchError, isLoading, data } = useQuery(['getSeasons'], async () => getSeasons());

    // Format season options so they are input compatible
    const seasonOptions: InputOption[] = useMemo(() => {
        if (!data) return [];

        return data.map((season) => ({
            value: season.id.toString(),
            label: season.name
        }));
    }, [data]);

    // If error fetching data
    if (fetchError) return <InputError error="Error fetching seasons" touched />;

    return (
        <DropdownInput
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            touched={touched}
            required={required}
            disabled={disabled}
            options={seasonOptions}
            placeholder="Select Season"
            asInput={asInput}
            isFetching={isLoading}
        />
    );
};

export default SeasonDropdown;