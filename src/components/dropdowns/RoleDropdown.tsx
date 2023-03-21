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
      label: role.charAt(0) + role.slice(1).toLowerCase()
    }));
  }, [data]);

  // If error fetching data
  if (fetchError) return <InputError error="Error fetching roles" touched />;

  return (
    <DropdownInput
      asInput={asInput}
      disabled={disabled}
      error={error}
      isFetching={isLoading}
      label={label}
      onChange={onChange}
      options={roleOptions}
      placeholder="Select Roles"
      required={required}
      touched={touched}
      value={value}
    />
  );
};

export default RoleDropdown