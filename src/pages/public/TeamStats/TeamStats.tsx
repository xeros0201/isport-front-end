import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

const TeamStats = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");

  return (
    <Page title="Team Stats">
      <RoundFilter
        leagueId={leagueId}
        onLeagueChange={setLeagueId}
        seasonId={seasonId}
        onSeasonChange={setSeasonId}
        round={round}
        onRoundChange={setRound}
      />
      <h1>Team Stats</h1>
    </Page>
  );
};

export default TeamStats;
