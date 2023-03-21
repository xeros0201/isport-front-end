import { useQuery } from "react-query";
import { useMemo, useEffect } from "react";
import { getMatchesBySeason } from "../../../api/matches";
import MatchFixtures from "../../../components/common/MatchFixture/MatchFixture";
import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { DateTime } from "luxon";
import "./Fixtures.scss";

const isEmptyObject = (value: object) : boolean=> {
  return Object.keys(value).length === 0 && value.constructor === Object;
}

//Group by property
const groupBy = (items: any, key: string) => items.reduce(
  (result: any, item: any) => {
      item.dateOnly = DateTime.fromISO(item.date).toLocaleString(DateTime.DATE_FULL);
      return ({
          ...result,
          [item[key]]: [
              ...(result[item[key]] || []),
              item,
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

  //Group by date
  const groupByDate = groupBy(filteredMatches, "dateOnly");

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
      {
        !isEmptyObject(groupByDate) ? Object.entries(groupByDate).map((item: any) => {
          const date: string = item[0];
          const match: Match = item[1][0];
          return (
            <div className="fixtures__fixture-group">
              <div className="date">{date}</div>
              <MatchFixtures matchFixture={match}/>
            </div>
          )
        })
        :
        <p>Please select league and season</p>
        
      }
    </Page>
  );
};

export default Fixtures;
