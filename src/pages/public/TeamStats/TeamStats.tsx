import { useMemo } from "react";
import { useQuery } from "react-query";
import { getPlayers } from "../../../api/players";
import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
import AveragesTable, { PlayerAverage } from "../../../components/tables/AveragesTable";
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { cloneDeep } from 'lodash';

interface TeamStatsProps {
  teamId: number;
  players: PlayerAverage[];
  teamName: string;
}

const TeamStats = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");

  const { isLoading, data: players } = useQuery(
    ["getPlayers"], async () => await getPlayers()
  );

  // TODO - update with averages API
  const playersAverage = useMemo(() => {
    if (!players || isLoading) return [];
    return players.map((item) => {
      return {
        ...item,
        players: [],
        properties: {
          disposal: {
            d: Math.floor(Math.random() * 10),
            e: Math.floor(Math.random() * 10),
            ie: Math.floor(Math.random() * 10)
          },
          clearances: {
            clr_bu: Math.floor(Math.random() * 10),
            clr_csb: Math.floor(Math.random() * 10)
          },
        },
        teamName: item.team.name
      }
    });
  }, [players]);

  const teamAverages = useMemo(() => {
    if (isLoading) return;
    const teamGrouping = playersAverage.reduce((accumulator: TeamStatsProps[], currentPlayer: PlayerAverage) => {
      const team = accumulator.find(team => team.teamId === currentPlayer.teamId);
      if (team) {
        team.players.push(currentPlayer);
      } else {
        accumulator.push({
          teamId: currentPlayer.teamId,
          players: [currentPlayer],
          teamName: currentPlayer.teamName,
        });
      }
      return accumulator;
    }, []);

    return teamGrouping.map((team, ind) => {
      const playersLength = team.players.length;

      const playerProperties = team.players.map((player) => player.properties);

      const propertyTotals: Record<string, Record<string, number>> = cloneDeep(playerProperties).reduce((accumulator, currentPlayer, i) => {
        if (i === 0) return currentPlayer
        Object.entries(currentPlayer).forEach(([groupKey, groupValue]) => {
          Object.keys(groupValue).forEach((property) => {
            accumulator[groupKey][property] += currentPlayer[groupKey][property]
          })
        })
        return accumulator
      }, {})

      for (const key1 in propertyTotals) {
        for (const innerKey in propertyTotals[key1]) {
          propertyTotals[key1][innerKey] = Math.round((propertyTotals[key1][innerKey] / playersLength) * 100) / 100;
        }
      }

      return {
        id: ind,
        name: team.teamName,
        playerNumber: undefined,
        players: team.players,
        properties: propertyTotals,
        teamId: team.teamId,
        teamName: team.teamName
      }
    })
  }, [playersAverage])

  const totalAverages = useMemo(() => {
    if (isLoading || !teamAverages) return;
    const teamLength = teamAverages.length
    const teamAverageProperties = teamAverages.map((team) => team.properties);

    const teamTotals: Record<string, Record<string, number>> = cloneDeep(teamAverageProperties).reduce((accumulator, currentTeam, i) => {
      if (i === 0) return currentTeam
      Object.entries(currentTeam).forEach(([groupKey, groupValue]) => {
        Object.keys(groupValue).forEach((property) => {
          accumulator[groupKey][property] += currentTeam[groupKey][property]
        })
      })
      return accumulator
    }, {})

    for (const key1 in teamTotals) {
      for (const innerKey in teamTotals[key1]) {
        teamTotals[key1][innerKey] = Math.round((teamTotals[key1][innerKey] / teamLength) * 100) / 100;
      }
    }

    return {
      id: 1,
      name: 'Grand Total',
      playerNumber: undefined,
      players: [],
      properties: teamTotals,
      teamId: 0,
      teamName: ''
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
      <AveragesTable
        data={teamAverages}
        isLoading={isLoading}
        totals={totalAverages}
      />
    </Page>
  );
};

export default TeamStats;
