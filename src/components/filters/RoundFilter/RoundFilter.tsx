import "./roundfilter.scss";
import { useEffect, useState } from "react";
import { Logo } from "../../common";
import { LeagueDropdown, SeasonDropdown } from "../../dropdowns";
import { Row } from "../../layout";
import "./RoundFilter.scss";
import { RoundInput } from "../../input";

export interface RoundFilterType {
    leagueId: string;
    seasonId: string;
    round: string;
    onLeagueChange: () => void;
    onSeasonChange: () => void;
    onRoundChange: () => void;
}

interface RoundFilterProps {
    onChange: (value: RoundFilterType) => void;
}

const RoundFilter = ({ onChange }: RoundFilterProps) => {
    const [leagueId, setLeagueId] = useState('');
    const [seasonId, setSeasonId] = useState('');
    const [round, setRound] = useState('');

    useEffect(() => {
        onChange({ leagueId, seasonId, round });
    }, [leagueId, seasonId, round]);

    return (
        <div className="roundfilter">
            <Row alignItems='center' noFlex>
                <Logo url="/public/league-logo.png" label="Round 21 - 2022" />
                <Row noFlex removeSpacing>
                    <LeagueDropdown
                        value={leagueId}
                        onChange={setLeagueId}
                    />
                    <SeasonDropdown
                        leagueId={leagueId}
                        value={seasonId}
                        onChange={setSeasonId}
                    />
                </Row>
            </Row>
            <RoundInput
                onChange={setRound}
                value={round}
                seasonId={seasonId}
            />
        </div>
    );
};

export default RoundFilter;