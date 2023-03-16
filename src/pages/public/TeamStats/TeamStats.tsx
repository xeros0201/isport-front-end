import { useMemo } from "react";
import { useQuery } from "react-query";
import { getPlayers } from "../../../api/players";
import { RoundFilter } from "../../../components/filters";
import { Page } from "../../../components/layout";
import AveragesTable from "../../../components/tables/AveragesTable";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

interface TeamAverage extends Omit<Player, 'team_id'> {
  players: TeamAverage[];
}

const TeamStats = () => {
  const [leagueId, setLeagueId] = useSearchParamsState("leagueId", "");
  const [seasonId, setSeasonId] = useSearchParamsState("seasonId", "");
  const [round, setRound] = useSearchParamsState("round", "");

  const { isLoading, data: players } = useQuery(
    ["getPlayers"], async () => await getPlayers()
  );

  // TODO - get averages from API
  const filteredPlayers = useMemo(() => {
    if (!players) return [];
    const playersAverage: TeamAverage[] = players.map((item) => {
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
        }
      }
    });

    const teams = playersAverage.reduce((acc: TeamAverage[], player) => {
      // Check if the teamId already exists in the accumulator
      let teamIndex = acc.findIndex(team => team.id === player.team.name);

      if (teamIndex === -1) {
        // If the team doesn't exist, create a new team object
        let newTeam: TeamAverage = {
          id: player.team.name,
          players: [player],
          properties: {
            // goals: 1, 
            disposal: {
              d: 2,
              e: 3,
              ie: 4
            },
            clearances: {
              clr_bu: 1,
              clr_csb: 2
            }
          },
          name: player.team.name,
          player_number: 0
        };
        acc.push(newTeam);
      } else {
        // If the team exists, add the player to the players array
        acc[teamIndex].players.push(player);
      }

      return acc;
    }, []);

    return teams
  }, [players]);

  // TODO - api for totals
  const averageTotal: TeamAverage = {
    id: -1,
    name: 'Total',
    player_number: 0,
    players: [],
    properties: {
      disposal: {
        d: 5,
        e: 6,
        ie: 7
      },
      clearances: {
        clr_bu: 8,
        clr_csb: 9
      }
    }
  }


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
      <AveragesTable data={filteredPlayers} totals={averageTotal} isLoading={isLoading} />
    </Page>
  );
};

export default TeamStats;
