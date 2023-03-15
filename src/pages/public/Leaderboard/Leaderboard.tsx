import StatisticFilter from "../../../components/filters/StatisticFilter/StatisticFilter";
import { Page } from "../../../components/layout";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

const Leaderboard = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");
  return (
    <Page title="Leaderboard">
      <h1>Leaderboard</h1>
      <StatisticFilter
        leagueId={leagueId}
        onLeagueChange={setLeagueId}
        seasonId={seasonId}
        onSeasonChange={setSeasonId}
        round={round}
        onRoundChange={setRound}
      ></StatisticFilter>
    </Page>
  );
};

export default Leaderboard;
