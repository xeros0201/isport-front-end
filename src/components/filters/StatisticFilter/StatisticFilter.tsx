import { Logo } from "../../common";
import { LeagueDropdown, SeasonDropdown, TeamDropdown } from "../../dropdowns";
import { Row } from "../../layout";
import "./StatisticFilter.scss";
import StatisticDropdown from "../../dropdowns/StatisticDropdown";

interface StatisticFilterProps {
  leagueId: string;
  seasonId: string;
  teamId: string;
  statisticAlias: string;
  onLeagueChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  onTeamChange: (value: string) => void;
  onStatisticChange: (value: string) => void;
}

const StatisticFilter = ({
  leagueId,
  seasonId,
  teamId,
  statisticAlias,
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
            requireLeague={true}
            leagueId={leagueId}
            value={seasonId}
            onChange={onSeasonChange}
          />
          <TeamDropdown
            isHasAllTeamOption
            requireSeason={true}
            seasonId={seasonId}
            value={teamId}
            onChange={onTeamChange}
          />
          <StatisticDropdown value={statisticAlias} onChange={onStatisticChange} />
        </Row>
      </Row>
    </div>
  );
};

export default StatisticFilter;
