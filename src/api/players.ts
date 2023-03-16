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
  const response = await axios.post<Player>("/players", player, authConfig);
  return response.data;
};

/**
 * Updates existing player.
 */
export const updatePlayer = async (id: number, player: PlayerFormValues): Promise<Player> => {
  const response = await axios.put<Player>(`/players/${id}`, player, authConfig);
  return response.data;
};
