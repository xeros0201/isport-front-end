import axios from "./axios";

/**
 * Fetches all player.
 * TODO: replace any type
 */
export const getPlayers = async (): Promise<any[]> => {
  const response = await axios.get<any[]>("/players");
  return response.data;
};

/**
 * Fetches player that matches id.
 * TODO: replace any type
 */
export const getPlayer = async (id: number): Promise<any> => {
  const response = await axios.get<any>(`/players/${id}`);
  return response.data;
};

/**
 * Creates new player.
 * TODO: replace any type
 */
export const createPlayer = async (player: {
  playerName: string;
  playerNumber: string;
  team: string;
  league: string;
}): Promise<any> => {
  const response = await axios.post<any>("/players", { ...player });
  return response.data;
};

/**
 * Updates existing player.
 * TODO: replace any type
 */
export const updatePlayer = async (player: {
  playerName: string;
  playerNumber: string;
  team: string;
  league: string;
}): Promise<any> => {
  const response = await axios.patch<any>("/players/${id}", player);
  return response.data;
};
