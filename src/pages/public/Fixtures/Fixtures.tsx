import { useQuery } from "react-query";
import { useMemo, useEffect } from "react";
import { getMatchesBySeason } from "../../../api/matches";
import MatchFixtures from "../../../components/common/MatchFixtures/MatchFixtures";
import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

const Fixtures = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");

  const { data: matches, refetch } = useQuery(
    ['getMatchesBySeason', { seasonId }],
    async (): Promise<any> => {
        if (!seasonId) return [];
        return getMatchesBySeason(+seasonId);
    },
    { enabled: !!seasonId }
  );

  // Fetch as soon as a seasonId is provided
  useEffect(() => {
    if (!seasonId) return;
    refetch();
  }, [seasonId]);

  // Filter data to match query  
  const filteredMatches = useMemo(() => {
    if (!matches) return [];
    if (+round === 0) return matches;
    return matches.filter((match: Match) => match.round === +round);
  }, [matches, setRound]);

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
      {
        filteredMatches && filteredMatches.map((match: Match) => {
          return <MatchFixtures matchFixture={match}/>;
        })
      }

    </Page>
  );
};

export default Fixtures;
