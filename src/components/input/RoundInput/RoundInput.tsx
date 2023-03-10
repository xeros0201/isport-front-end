import "./RoundInput.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { getMatchesBySeason } from "../../../api/matches";

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
    // const options = useMemo(() => {
    //     return Array.from({length: totalRounds}, (_, i) => i + 1).map((i) => ({
    //         value: i.toString(),
    //         label: i.toString()
    //     }))
    // }, []);

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
        console.log('seasonId', seasonId);
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


    const renderOption = (round: 'ALL' | number, onChange: (value: any) => void) => {
        const optionClasses = classNames({ 
            'roundinput__option': true,
            'roundinput__option--disabled': round !== 'ALL' && round > rounds[rounds.length],
            'roundinput__option--selected': (round.toString() === value && round !=='ALL') || (round.toString() === 'ALL' && value === '')
        });
        return (
            <div className={optionClasses} onClick={onChange}>
                {round}
            </div>
        )
    }

    return (
        <div className="roundinput">
            {!!rounds.length && renderOption('ALL', () => onChange(''))}
            {rounds.map((option) => renderOption(option, () => onChange(option.toString())))}
        </div>
    );
};

export default RoundInput;