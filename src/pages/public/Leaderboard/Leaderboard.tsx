import { useEffect, useMemo, useState } from "react";
import StatisticFilter from "../../../components/filters/StatisticFilter/StatisticFilter";
import { Page } from "../../../components/layout";
import LeaderboardTable from "../../../components/tables/LeaderBoardTable";
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { PublicNavigationButtons } from "../../../components/common";
import { statOptions } from "../../../data/statistics";
import "./LeaderBoard.scss";

const Leaderboard = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [teamId, setTeamId] = useSearchParamsState("teamId", "");
  const [statisticAlias, setStatisticAlias] = useSearchParamsState("property", "");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const property = queryParams.get('property');
    if(property != statisticAlias)
      setStatisticAlias("G");
  }, []);

  const statLabel = useMemo(() => {
    const stat = statOptions.find((stat) => stat.alias === statisticAlias);
    return stat?.name || statisticAlias;
  }, [statisticAlias]);

  return (
    <Page title="Leaderboard">
      <div className="leaderboard">
        <StatisticFilter
          leagueId={leagueId}
          onLeagueChange={setLeagueId}
          seasonId={seasonId}
          onSeasonChange={setSeasonId}
          teamId={teamId}
          onTeamChange={setTeamId}
          statisticAlias={statisticAlias}
          onStatisticChange={setStatisticAlias}
        ></StatisticFilter>
        <h1>Leaderboard</h1>
        <PublicNavigationButtons currentPage="leaderboard" leagueId={+leagueId} seasonId={+seasonId} />
        <LeaderboardTable property={statLabel} teamId={+teamId} seasonId={+seasonId} leagueId={+leagueId} />
      </div>
    </Page>
  );
};

export default Leaderboard;
