import axios, { authConfig } from "./axios";

/**
 * Fetches all teams.
 */
export const getTeams = async (): Promise<Team[]> => {
  const response = await axios.get<Team[]>("/teams");
  return response.data;
};

/**
 * Fetches all team players.
 */
export const getTeamPlayers = async (id: string): Promise<Player[]> => {
  const response = await axios.get<Player[]>(`/teams/${id}/players`);
  return response.data;
};
