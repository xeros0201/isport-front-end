import "./RoundInput.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { getMatchesBySeason } from "../../../api/matches";
import DropdownInput from "../DropdownInput/DropdownInput";

interface RoundInputProps extends InputProps {
  seasonId: string;
}

const RoundInput = ({
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

  const { error: fetchError, isLoading, data, refetch } = useQuery(
    ['getMatchesBySeason', { seasonId }],
    async (): Promise<Match[]> => {
      if (!seasonId) return [];
      return getMatchesBySeason(+seasonId);
    },
    { enabled: !!seasonId }
  );

  // Fetch as soon as a seasonId is provided
  useEffect(() => {
    if (!seasonId) return;
    onChange('');
    refetch();
  }, [seasonId]);

  // With data, calculate and set rounds
  useEffect(() => {
    if (!data) return;
    const rounds = data.reduce((acc, match) => {
      if (!acc.includes(match.round)) {
        acc.push(match.round);
      }
      return acc;
    }, [] as number[]).sort();
    setRounds(rounds);
  }, [data]);


  const renderOption = (round: 'ALL' | number, onChange: (valueNew: any) => void, index: number) => {
    const optionClasses = classNames({
      'roundinput__option': true,
      'roundinput__option--disabled': round !== 'ALL' && round > rounds[rounds.length],
      'roundinput__option--selected': (round.toString() === value && round !== 'ALL') || (round.toString() === 'ALL' && value === '')
    });
    return (
      <div key={index} className={optionClasses} onClick={onChange}>
        {round}
      </div>
    )
  }

  if(!seasonId) return <></>;

  return (
    <div className="roundinput">
      {!!rounds.length && renderOption('ALL', () => onChange(''), -1)}
      {rounds.map((option, i) => renderOption(option, () => onChange(option.toString()), i))}
    </div>
  );
};

export default RoundInput;