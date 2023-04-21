import { useQuery } from "react-query";
import { useMemo, useEffect, useState } from "react";
import { getMatchesBySeason } from "../../../api/matches";
import MatchFixtures from "../../../components/common/MatchFixture/MatchFixture";
import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { DateTime } from "luxon";
import "./Fixtures.scss";
import { MatchStatus } from "../../../types/enums";
import { PublicNavigationButtons } from "../../../components/common";

const isEmptyObject = (value: object) : boolean=> {
  return Object.keys(value).length === 0 && value.constructor === Object;
}

//Group by property
const groupMatchesByDate = (matches: Match[]): {[key: string]: Match[]} => matches.reduce(
  (result: any, match: any) => {
      match.dateOnly = DateTime.fromISO(match.date).toLocaleString(DateTime.DATE_FULL);
      return ({
          ...result,
          [match.dateOnly]: [
              ...(result[match.dateOnly] || []),
              match,
          ],
      })
  },
  {},
);

const Fixtures = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");

  const { data: matches, refetch } = useQuery(
    ['getMatchesBySeason', { seasonId }],
    async (): Promise<any> => {
        if (!seasonId) return [];
        const matches = await getMatchesBySeason(+seasonId);
        return matches;
    },
    { enabled: !!seasonId }
  );

  // Fetch as soon as a seasonId is provided
  useEffect(() => {
    if (!seasonId) return;
    refetch();
  }, [seasonId]);

  // Filter out unpublished matches
  const publishedMatches = useMemo(() => {
    if (!matches) return [];
    return matches.filter((match : Match) => match.status === MatchStatus.PUBLISHED);
  }, [matches]);

  // Filter data to match query  
  const filteredMatches = useMemo(() => {
    if (!publishedMatches) return [];
    if (+round === 0) return publishedMatches;
    return publishedMatches.filter((match: Match) => match.round === +round);
  }, [publishedMatches, setRound]);

  //Group by date
  const groupByDate = groupMatchesByDate(filteredMatches);

  return (
    <Page title="Fixtures">
      <RoundFilter
        leagueId={leagueId}
        onLeagueChange={setLeagueId}
        seasonId={seasonId}
        onSeasonChange={setSeasonId}
        round={round}
        onRoundChange={setRound}
        dropdown
      />
      <h1>Fixtures & Results</h1>
      <PublicNavigationButtons currentPage="fixtures" leagueId={+leagueId} seasonId={+seasonId} />
      {
        !isEmptyObject(groupByDate) 
          ? Object.entries(groupByDate)
            .sort(([date1], [date2]) => new Date(date2).getTime() - new Date(date1).getTime())
            .map((item: any, i) => {
              const date: string = item[0];
              const matches: Match[] = item[1];
              return (
                <div key={i} className="fixtures__fixture-group">
                  <div className="date">{date}</div>
                  { matches.map((match: Match) => <MatchFixtures key={match.id} matchFixture={match}/>) }
                </div>
              )
            })
          : <p>Please select league and season</p>
      }
    </Page>
  );
};

export default Fixtures;
