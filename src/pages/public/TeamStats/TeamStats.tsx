import { useMemo } from "react";
import { useQuery } from "react-query";
import { getPlayers } from "../../../api/players";
import { getTeams } from "../../../api/teams";
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

  const { isLoading, data: teams } = useQuery(
    ["getTeams"], async () => await getTeams()
  );

  const { isLoading: loading2, data: players } = useQuery(
    ["getPlayers"], async () => await getPlayers()
  );

  const filteredPlayers = useMemo(() => {
    if (!players) return [];
    const playersWithGoals = players.map((item) => {
      return {
        ...item,
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
          goals: Math.floor(Math.random() * 10)
        }
      }
    });
    
    const teams = playersWithGoals.reduce((acc: TeamAverage[], player) => {
      // Check if the teamId already exists in the accumulator
      let teamIndex = acc.findIndex(team => team.id === player.team.name );

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
    console.log('teams',teams);

    return teams
  }, [players]);


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
      <AveragesTable data={filteredPlayers} isLoading={isLoading || loading2} />
    </Page>
  );
};

export default TeamStats;
