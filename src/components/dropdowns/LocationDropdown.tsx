import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { createLocation, getLocations } from "../../api/locations";
import { InputError, CreatableDropdownInput } from "../input";

const LocationDropdown = ({
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
}: ImplementedDropdownProps) => {
  const {
    error: fetchError,
    isLoading,
    data,
  } = useQuery(["getLocations"], async () => getLocations());
  const [options, setOptions] = useState<InputOption[]>([])

  // Format location options so they are input compatible
  const locationOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((location) => ({
      value: location.id.toString(),
      label: location.name,
    }));
  }, [data]);

  const handleCreateRequest = (value: string) => {
    return createLocation(value)
  }

  useEffect(() => {
    setOptions(locationOptions)
  },[locationOptions]);

  // If error fetching data
  if (fetchError)
    return <InputError error="Error fetching locations" touched />;

  return (
    <CreatableDropdownInput<Location>
      disabled={disabled}
      error={error}
      handleCreateRequest={handleCreateRequest}
      isFetching={isLoading}
      label={label}
      onChange={onChange}
      options={options}
      placeholder="Select Location"
      required={required}
      setOptions={setOptions}
      touched={touched}
      value={value}
    />
  );
};

export default LocationDropdown;
