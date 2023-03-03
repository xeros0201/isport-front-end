import axios from "./axios";

/**
 * Fetches all Teams.
 */
export const getTeams = async (): Promise<Team[]> => {
    const response = await axios.get<Team[]>('/teams');
    return response.data;
};

/**
 * Fetches Team that matches id.
 */
export const getTeam = async (id: number): Promise<Team> => {
    const response = await axios.get<Team>(`/teams/${id}`);
    return response.data;
};

/**
 * Creates new Team.
 */
export const createTeam = async (team: { name: string }): Promise<Team> => {
    const response = await axios.post<Team>('/teams', { ...team, sportId: 1 });
    return response.data;
}

/**
 * Updates existing Team.
 */
export const updateTeam = async (id: number, team: { name: string }): Promise<Team> => {
    const response = await axios.patch<Team>('/teams/${id}', team);
    return response.data;
}
