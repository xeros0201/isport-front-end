import { useMemo } from "react";
import { useQuery } from "react-query";
import { InputError, DropdownInput } from "../input";
import { statOptions } from "../../data/statistics";

interface StatisticDropdown extends ImplementedDropdownProps {}

const StatisticDropdown = ({
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
  asInput,
}: StatisticDropdown) => {
  const {
    error: fetchError,
    isLoading,
    data: stats,
  } = useQuery(["getStatistics"], async (): Promise<Statistic[]> => {
    return statOptions;
  });

  // Format statistic options so they are input compatible
  const statisticOptions: InputOption[] = useMemo(() => {
    if (!stats) return [];

    const alphaSortedName = stats.sort((a: Statistic, b: Statistic) =>
      a.name.localeCompare(b.name)
    );

    return alphaSortedName.map((item) => ({
      value: item.alias,
      label: item.name,
    }));

  }, [stats]);

  // If error fetching data
  if (fetchError)
    return <InputError error="Error fetching statistics" touched />;

  return (
    <DropdownInput
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled}
      options={statisticOptions}
      placeholder="Select Statistic"
      asInput={asInput}
      isFetching={isLoading}
    />
  );
};

export default StatisticDropdown;
