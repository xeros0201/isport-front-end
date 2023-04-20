import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
import AveragesTable, { TeamAverage } from "../../../components/tables/AveragesTable";
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { cloneDeep } from 'lodash';
import { getTeamAverages } from "../../../api/teams";
import PublicNavigationButtons from "../PublicNavigationButtons/PublicNavigationButtons";

const TeamStats = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");

  const { isLoading, data: averages } = useQuery(
    ["getTeamAverages", seasonId, round], async () => {
      if (!seasonId) return []
      return getTeamAverages(round, seasonId)
    }
  );

  const teamAverages: TeamAverage[] = useMemo(() => {
    if (isLoading || !averages) return [];

    return averages.map((team) => {
      const playersLength = team.players.length;

      const playerProperties = team.players.map((player) => player.values);

      const propertyTotals: Record<string, Record<string, { name: string, value: number }>> = cloneDeep(playerProperties)
        .reduce((
          accumulator: Record<string, Record<string, { name: string, value: number }>>,
          currentPlayer: Record<string, Record<string, { name: string, value: number }>>,
          i: number
        ) => {
          if (i === 0) return currentPlayer
          Object.entries(currentPlayer).forEach(([groupKey, groupValue]) => {
            Object.keys(groupValue).forEach((property) => {
              accumulator[groupKey][property].value += currentPlayer[groupKey][property].value
            })
          })
          return accumulator
        }, {})

      for (const key1 in propertyTotals) {
        for (const innerKey in propertyTotals[key1]) {
          propertyTotals[key1][innerKey].value = Math.round((propertyTotals[key1][innerKey].value / playersLength) * 100) / 100;
        }
      }

      const updatedPlayers = team.players.map((player) => {
        return {
          id: player.player.id,
          name: player.player.name,
          players: [],
          properties: player.values,
        }
      })

      return {
        id: team.team.id,
        name: team.team.name,
        players: updatedPlayers,
        properties: propertyTotals,
      }
    })
  }, [averages])

  const totalAverages: TeamAverage | undefined = useMemo(() => {
    if (isLoading || !teamAverages) return;
    const teamLength = teamAverages.length
    const teamAverageProperties = teamAverages.map((team) => team.properties);

    const teamTotals: Record<string, Record<string, { name: string, value: number }>> = cloneDeep(teamAverageProperties).reduce((
      accumulator: Record<string, Record<string, { name: string, value: number }>>,
      currentTeam: Record<string, Record<string, { name: string, value: number }>>,
      i: number
    ) => {
      if (i === 0) return currentTeam
      Object.entries(currentTeam).forEach(([groupKey, groupValue]) => {
        Object.keys(groupValue).forEach((property) => {
          accumulator[groupKey][property].value += currentTeam[groupKey][property].value
        })
      })
      return accumulator
    }, {})

    for (const key1 in teamTotals) {
      for (const innerKey in teamTotals[key1]) {
        teamTotals[key1][innerKey].value = Math.round((teamTotals[key1][innerKey].value / teamLength) * 100) / 100;
      }
    }

    return {
      id: 1,
      name: 'Grand Total',
      players: [],
      properties: teamTotals,
    }
  }, [teamAverages])

  return (
    <Page title="Team & Player Averages">
      <RoundFilter
        leagueId={leagueId}
        onLeagueChange={setLeagueId}
        seasonId={seasonId}
        onSeasonChange={setSeasonId}
        round={round}
        onRoundChange={setRound}
        dropdown
      />
      <h1>Team & Player Averages</h1>
      <PublicNavigationButtons currentPage="averages" leagueId={+leagueId} seasonId={+seasonId} />
      {leagueId && seasonId
        && <AveragesTable
          data={teamAverages}
          isLoading={isLoading}
          totals={totalAverages}
        />
      }
    </Page>
  );
};

export default TeamStats;
