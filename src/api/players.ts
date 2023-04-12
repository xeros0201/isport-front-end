import axios, { authConfig } from "./axios";

export interface PlayerFormValues {
  name: string;
  playerNumber: string;
  teamId: string;
  leagueId: string;
  seasonId: string;
}

/**
 * Fetches all player.
 */
export const getPlayers = async (): Promise<Player[]> => {
  const response = await axios.get<Player[]>("/players", authConfig);
  return response.data;
};

/**
 * Fetches player that matches id.
 */
export const getPlayer = async (id: number): Promise<Player> => {
  const response = await axios.get<Player>(`/players/${id}`, authConfig);
  return response.data;
};

/**
 * Creates new player.
 */
export const createPlayer = async ( player: PlayerFormValues ): Promise<Player> => {
  const response = await axios.post<Player>("/players", {
    playerNumber: parseInt(player.playerNumber),
    teamId: parseInt(player.teamId),
    name: player.name
  }, authConfig);
  return response.data;
};

/**
 * Updates existing player.
 */
export const updatePlayer = async (id: number, player: PlayerFormValues): Promise<Player> => {
  const response = await axios.put<Player>(`/players/${id}`, {
    playerNumber: parseInt(player.playerNumber),
    teamId: parseInt(player.teamId),
    name: player.name
  }, authConfig);
  return response.data;
};

/**
 * Get stats
 */
export const getStats = async (property: string, teamId?: number): Promise<PlayersOnAflResults[]> => {
  const response = await axios.get<PlayersOnAflResults[]>(`/players/_stats`,{
    params: {
      property,
      teamId
    }
  });
  return response.data;
};