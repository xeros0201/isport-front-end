import { Logo } from "../../common";
import { LeagueDropdown, SeasonDropdown, TeamDropdown } from "../../dropdowns";
import { Row } from "../../layout";
import "./StatisticFilter.scss";
import { RoundInput } from "../../input";
import StatisticDropdown from "../../dropdowns/StatisticDropdown";

interface StatisticFilterProps {
  leagueId: string;
  seasonId: string;
  teamId: string;
  statisticId: string;
  onLeagueChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  onTeamChange: (value: string) => void;
  onStatisticChange: (value: string) => void;
}

const StatisticFilter = ({
  leagueId,
  seasonId,
  teamId,
  statisticId,
  onLeagueChange,
  onSeasonChange,
  onTeamChange,
  onStatisticChange,
}: StatisticFilterProps) => {
  return (
    <div className="statistic-filter">
      <Row alignItems="center" noFlex>
        <Logo
          url="/public/league-logo.png"
          label="Disposal Leaderboard - 2022"
        />
        <Row noFlex removeSpacing>
          <LeagueDropdown value={leagueId} onChange={onLeagueChange} />
          <SeasonDropdown
            leagueId={leagueId}
            value={seasonId}
            onChange={onSeasonChange}
          />
          <TeamDropdown
            seasonId={seasonId}
            value={teamId}
            onChange={onTeamChange}
          />
          <StatisticDropdown value={statisticId} onChange={onStatisticChange} />
        </Row>
      </Row>
    </div>
  );
};

export default StatisticFilter;
