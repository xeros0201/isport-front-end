import axios from "./axios";

/**
 * Fetches all leagues.
 */
export const getLeagues = async (): Promise<League[]> => {
    const response = await axios.get<League[]>('/league');
    return response.data;
};

/**
 * Fetches league that matches id.
 */
export const getLeague = async (id: number): Promise<League> => {
    const response = await axios.get<League>(`/league/${id}`);
    return response.data;
};

/**
 * Creates new league.
 */
export const createLeague = async (league: { name: string }): Promise<League> => {
    const response = await axios.post<League>('/league', { ...league, sportId: 1 });
    return response.data;
}

/**
 * Updates existing league.
 */
export const updateLeague = async (id: number, league: { name: string }): Promise<League> => {
    const response = await axios.patch<League>('/league/${id}', league);
    return response.data;
}
