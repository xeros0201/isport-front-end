import axios from "./axios";

/**
 * Fetches all players.
 */
export const getPlayers = async (): Promise<Player[]> => {
  const response = await axios.get<Player[]>('/players');
  return response.data;
};

/**
* Fetches player that matches id.
*/
export const getPlayer = async (id: number): Promise<Player> => {
  const response = await axios.get<Player>(`/players/${id}`);
  return response.data;
};