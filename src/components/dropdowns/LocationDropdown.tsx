import { useMemo } from "react";
import { useQuery } from "react-query";
import { getLocations } from "../../api/locations";
import { Spinner } from "../common";
import { InputError, DropdownInput } from "../input";

const LocationDropdown = ({
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
  } = useQuery(["getLocations"], async () => getLocations());

  // Format location options so they are input compatible
  const locationOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((location) => ({
      value: location.id.toString(),
      label: location.name,
    }));
  }, [data]);

  // If error fetching data
  if (fetchError)
    return <InputError error="Error fetching locations" touched />;

  return (
    <DropdownInput
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled}
      options={locationOptions}
      placeholder="Select Location"
      asInput={asInput}
      isFetching={isLoading}
    />
  );
};

export default LocationDropdown;
