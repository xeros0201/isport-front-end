import axios, { authConfig } from "./axios";

export interface TeamFormValues {
  name: string;
  logo: string | File;
  leagueId: string;
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
 * Fetches all team players.
 */
export const getTeamPlayers = async (id: string): Promise<Player[]> => {
  const response = await axios.get<Player[]>(`/teams/${id}/players`);
  return response.data;
};

/**
 * Get teams that belong to a season.
 */
export const getTeamBySeasons = async (seasonId: number): Promise<Team[]> => {
  const response = await axios.get<Team[]>(`/seasons/${seasonId}/teams`);
  return response.data;
};

/**
 * Creates new Team.
 */
export const createTeam = async (team: TeamFormValues): Promise<Team> => {
  const formData = new FormData();
  formData.append("name", team.name);
  formData.append("logo", team.logo);
  formData.append("seasonId", team.seasonId);
  const response = await axios.post<Team>("/teams", formData, {
    ...authConfig,
    headers: { "Content-Type": "multipart/form-data" },
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
  const formData = new FormData();
  delete team.leagueId;
  Object.keys(team).forEach((key) => {
    if (!!team[key as keyof TeamFormValues])
      formData.append(key, team[key as keyof TeamFormValues] as string | Blob);
  });

  const response = await axios.put<Team>(`/teams/${id}`, formData, {
    ...authConfig,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
