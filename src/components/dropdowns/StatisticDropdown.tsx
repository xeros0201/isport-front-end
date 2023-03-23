import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { getTeamBySeasons } from "../../api/teams";
import { getTeams } from "../../api/teams";
import { InputError, DropdownInput } from "../input";

const statistics = [
  {
    id: 1,
    name: "Disposals",
  },
  {
    id: 2,
    name: "Goals",
  },
];

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
    data,
    refetch,
  } = useQuery(["getStatistics"], async (): Promise<Statistic[]> => {
    return statistics;
  });

  // Format statistic options so they are input compatible
  const statisticOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      value: item.id.toString(),
      label: item.name,
    }));
  }, [data]);

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
