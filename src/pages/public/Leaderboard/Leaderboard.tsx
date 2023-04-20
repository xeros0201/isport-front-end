import { useState } from "react";
import StatisticFilter from "../../../components/filters/StatisticFilter/StatisticFilter";
import { Page } from "../../../components/layout";
import LeaderboardTable from "../../../components/tables/LeaderBoardTable";
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import PublicNavigationButtons from "../PublicNavigationButtons/PublicNavigationButtons";
import "./LeaderBoard.scss";

const Leaderboard = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [teamId, setTeamId] = useSearchParamsState("teamId", "");
  const [statisticAlias, setStatisticAlias] = useSearchParamsState("property", "");

  return (
    <Page title="Leaderboard">
      <div className="leaderboard">
        <h1>Leaderboard</h1>
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
        <PublicNavigationButtons leagueId={+leagueId} seasonId={+seasonId} />
        <LeaderboardTable property={statisticAlias} teamId={+teamId} seasonId={+seasonId} leagueId={+leagueId} />
      </div>
    </Page>
  );
};

export default Leaderboard;
