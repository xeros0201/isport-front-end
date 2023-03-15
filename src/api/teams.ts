import axios from "./axios";

export interface TeamFormValues {
  name: string;
  logo: string;
  seasonId: string;
}

/**
 * Fetches all teams.
 */
export const getTeams = async (): Promise<Team[]> => {
  const response = await axios.get<Team[]>("/teams");
  return response.data;
};

/**
 * Fetches team that matches id.
 */
export const getTeam = async (id: number): Promise<Team> => {
  const response = await axios.get<Team>(`/teams/${id}`);
  return response.data;
};

/**
 * Creates new Team.
 */
export const createTeam = async (team: TeamFormValues): Promise<Team> => {
  const response = await axios.post<Team>("/teams", {
    ...team,
    seasonId: +team.seasonId,
  });
  return response.data;
};

/**
 * Updates existing Team.
 */
export const updateTeam = async (
  id: number,
  team: Partial<TeamFormValues>
): Promise<Team> => {
  const response = await axios.put<Team>(`/teams/${id}`, team);
  return response.data;
};
