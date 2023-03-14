// import "./roundfilter.scss";
import { Logo } from "../../common";
import { LeagueDropdown, SeasonDropdown } from "../../dropdowns";
import { Row } from "../../layout";
import "./RoundFilter.scss";
import { RoundInput } from "../../input";

interface RoundFilterProps {
    leagueId: string;
    seasonId: string;
    round: string;
    onLeagueChange: (value: string) => void;
    onSeasonChange: (value: string) => void;
    onRoundChange: (value: string) => void;
}

const RoundFilter = ({
    leagueId,
    seasonId,
    round,
    onLeagueChange,
    onSeasonChange,
    onRoundChange,
}: RoundFilterProps) => {

    return (
        <div className="roundfilter">
            <Row alignItems='center' noFlex>
                <Logo url="/public/league-logo.png" label="Round 21 - 2022" />
                <Row noFlex removeSpacing>
                    <LeagueDropdown
                        value={leagueId}
                        onChange={onLeagueChange}
                    />
                    <SeasonDropdown
                        leagueId={leagueId}
                        value={seasonId}
                        onChange={onSeasonChange}
                    />
                </Row>
            </Row>
            <RoundInput
                onChange={onRoundChange}
                value={round}
                seasonId={seasonId}
            />
        </div>
    );
};

export default RoundFilter;