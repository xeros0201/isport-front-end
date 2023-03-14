import MatchFixtures from "../../../components/common/MatchFixtures/MatchFixtures";
import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

const psuedoData : MatchFixture = {
  homeTeamLogo : "/public/league-logo.png",
  homeTeamName: "Home Team",
  homeTeamScorePrimary : 20,
  homeTeamScoreSecondary : 0,
  awayTeamLogo : "/public/league-logo.png",
  awayTeamName : "Away Team",
  awayTeamScorePrimary : 10,
  awayTeamScoreSecondary : 0,
  matchTime: "02:00 PM",
  location: "Broadbeach AFL Ground"
}

const Fixtures = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");

  return (
    <Page title="Fixtures">
      <RoundFilter
        leagueId={leagueId}
        onLeagueChange={setLeagueId}
        seasonId={seasonId}
        onSeasonChange={setSeasonId}
        round={round}
        onRoundChange={setRound}
      />
      <h1>Fixtures</h1>
      <MatchFixtures fixture={psuedoData}/>
      <MatchFixtures fixture={psuedoData}/>
    </Page>
  );
};

export default Fixtures;
