import { Logo } from "../../common";
import { LeagueDropdown, SeasonDropdown } from "../../dropdowns";
import { Row } from "../../layout";
import "./StatisticFilter.scss";
import { RoundInput } from "../../input";

interface StatisticFilterProps {
  leagueId: string;
  seasonId: string;
  round: string;
  onLeagueChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  onRoundChange: (value: string) => void;
}

const StatisticFilter = ({
  leagueId,
  seasonId,
  round,
  onLeagueChange,
  onSeasonChange,
  onRoundChange,
}: StatisticFilterProps) => {
  return (
    <div className="statistic-filter">
      <Row alignItems="center" noFlex>
        <Logo url="/public/league-logo.png" label="Round 21 - 2022" />
        <Row noFlex removeSpacing>
          <LeagueDropdown value={leagueId} onChange={onLeagueChange} />
          <SeasonDropdown
            leagueId={leagueId}
            value={seasonId}
            onChange={onSeasonChange}
          />
        </Row>
      </Row>
      <RoundInput onChange={onRoundChange} value={round} seasonId={seasonId} />
    </div>
  );
};

export default StatisticFilter;
