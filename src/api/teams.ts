import axios from "./axios";

export interface TeamFormValues {
  name: string;
  logo: string;
}

/**
 * Fetches all teams.
 */
export const getTeams = async (): Promise<Team[]> => {
    const response = await axios.get<Team[]>('/teams');
    return response.data;
};

/**
 * Fetches team that matches id.
 */
export const getTeam = async (id: number): Promise<Team> => {
    const response = await axios.get<Team>(`/teams/${id}`);
    return response.data;
};
