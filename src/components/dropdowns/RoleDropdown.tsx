import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getRoles } from '../../api/auth';
import { DropdownInput, InputError } from '../input';

const RoleDropdown = ({
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
  asInput
}: ImplementedDropdownProps) => {
  const { error: fetchError, isLoading, data } = useQuery(['getRoles'], async () => getRoles());

  // Format role options so they are input compatible
  const roleOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((role) => ({
      value: role,
      label: role
    }));
  }, [data]);

  // If error fetching data
  if (fetchError) return <InputError error="Error fetching roles" touched />;

  return (
    <DropdownInput
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled}
      options={roleOptions}
      placeholder="Select Roles"
      asInput={asInput}
      isFetching={isLoading}
    />
  );
};

export default RoleDropdown