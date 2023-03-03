import axios, { authConfig } from "./axios";

export interface LeagueFormValues {
  name: string;
  logo: string;
}

/**
 * Fetches all leagues.
 */
export const getLeagues = async (): Promise<League[]> => {
    const response = await axios.get<League[]>('/leagues');
    return response.data;
};

/**
 * Fetches league that matches id.
 */
export const getLeague = async (id: number): Promise<League> => {
    const response = await axios.get<League>(`/leagues/${id}`);
    return response.data;
};

/**
 * Creates new league.
 */
export const createLeague = async (league: { name: string }): Promise<League> => {
    const sportId =  +import.meta.env.VITE_ISPORTS_AFL_ID;
    const response = await axios.post<League>('/leagues', {...league, sportId}, authConfig);
    return response.data;
}

/**
 * Updates existing league.
 */
export const updateLeague = async (id: number, league: { name: string }): Promise<League> => {
    const response = await axios.patch<League>(`/leagues/${id}`, league, authConfig);
    return response.data;
}
