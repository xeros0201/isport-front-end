import StatisticFilter from "../../../components/filters/StatisticFilter/StatisticFilter";
import { Page } from "../../../components/layout";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

const Leaderboard = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [teamId, setTeamId] = useSearchParamsState("teamId", "");
  const [statisticId, setStatisticId] = useSearchParamsState("statistic", "");
  return (
    <Page title="Leaderboard">
      <h1>Leaderboard</h1>
      <StatisticFilter
        leagueId={leagueId}
        onLeagueChange={setLeagueId}
        seasonId={seasonId}
        onSeasonChange={setSeasonId}
        teamId={teamId}
        onTeamChange={setTeamId}
        statisticId={statisticId}
        onStatisticChange={setStatisticId}
      ></StatisticFilter>
    </Page>
  );
};

export default Leaderboard;
