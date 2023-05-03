import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { InputError, DropdownInput } from "../input";

interface StatisticDropdown extends ImplementedDropdownProps {}

export const statDropdown: Statistic[] = [
  {
    id: 57,
    name: "Disposals",
    alias: "D",
  },
  {
    id: 74,
    name: "Tackles",
    alias: "T",
  },
  {
    id: 60,
    name: "Contested Possession",
    alias: "CP",
  },
  {
    id: 56,
    name: "Clearances",
    alias: "CLR",
  },
  {
    id: 54,
    name: "Goals",
    alias: "G",
  },
  {
    id: 63,
    name: "Contested Mark",
    alias: "CM",
  },
  {
    id: 70,
    name: "Kicking efficiency",
    alias: "PER_2",
  },
  {
    id: 47,
    name: "Hit outs",
    alias: "HO",
  },
  {
    id: 53,
    name: "Inside 50s",
    alias: "I50",
  },
  {
    id: 66,
    name: "Intercept marks",
    alias: "INTM",
  },
  {
    id: 65,
    name: "F50 marks",
    alias: "F50M",
  },
];

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
    return statDropdown;
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
