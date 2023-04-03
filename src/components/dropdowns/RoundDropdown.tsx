import { FC, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getMatchesBySeason } from "../../api/matches";
import DropdownInput from "../input/DropdownInput/DropdownInput";

interface RoundInputProps extends InputProps {
  seasonId: string;
}

const RoundDropdown = ({
  value,
  onChange,
  disabled,
  error,
  htmlFor,
  label,
  required,
  touched,
  seasonId,
}: RoundInputProps) => {
  const [rounds, setRounds] = useState<number[]>([]);

  const {
    error: fetchError,
    isLoading,
    data,
    refetch,
  } = useQuery(
    ["getMatchesBySeason", { seasonId }],
    async (): Promise<Match[]> => {
      if (!seasonId) return [];
      return getMatchesBySeason(+seasonId);
    },
    { enabled: !!seasonId }
  );

  // Fetch as soon as a seasonId is provided
  useEffect(() => {
    if (!seasonId) return;
    onChange("");
    refetch();
  }, [seasonId]);

  // With data, calculate and set rounds
  useEffect(() => {
    if (!data) return;
    const rounds = data
      .reduce((acc, match) => {
        if (!!match.round && !acc.includes(match.round)) {
          acc.push(match.round);
        }
        return acc;
      }, [] as number[])
      .sort();
    setRounds(rounds);
  }, [data]);

  const roundOptions: InputOption[] = useMemo(() => {
    if (!rounds) return [];
    return rounds.map((round) => ({
      value: round.toString(),
      label: `Round ${round.toString()}`,
    }));
  }, [rounds]);

  const allOption: InputOption = {
    value: "All",
    label: "All Rounds",
  };

  if (!seasonId) return <></>;

  return (
    <DropdownInput
      disabled={disabled}
      error={error}
      htmlFor={htmlFor}
      isFetching={isLoading}
      label={label}
      onChange={(item) => onChange(item === "All" ? "" : item)}
      options={[allOption, ...roundOptions]}
      required={required}
      touched={touched}
      value={value === "" ? "All" : value}
    />
  );
};

export default RoundDropdown;
