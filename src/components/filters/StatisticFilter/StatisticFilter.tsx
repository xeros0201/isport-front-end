import { Logo } from "../../common";
import { LeagueDropdown, SeasonDropdown, TeamDropdown } from "../../dropdowns";
import { Row } from "../../layout";
import "./StatisticFilter.scss";
import StatisticDropdown, {
  statDropdown,
} from "../../dropdowns/StatisticDropdown";
import { useQuery } from "react-query";
import { getLeague } from "../../../api/leagues";
import { useMemo } from "react";
import { getSeason } from "../../../api/seasons";
const s3URL = import.meta.env.VITE_S3_URL;

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
  const { data: league } = useQuery(["getLeague", leagueId], async () =>
    getLeague(+leagueId)
  );
  const { data: season } = useQuery(["getSeason", seasonId], async () =>
    getSeason(+seasonId)
  );
  const statName = useMemo(
    () => statDropdown.find((item) => item.alias === statisticAlias)?.name,
    [statDropdown, statisticAlias]
  );
  return (
    <div className="statistic-filter">
      <Row alignItems="center" noFlex>
        <Logo
          url={
            league?.logo
              ? `${s3URL}/images/${league?.logo}`
              : "/league-logo.png"
          }
          label={`${statName || ""} Leaderboard${
            season?.name ? ` - ${season?.name}` : ""
          }`}
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
          <StatisticDropdown
            value={statisticAlias}
            onChange={onStatisticChange}
          />
        </Row>
      </Row>
    </div>
  );
};

export default StatisticFilter;
