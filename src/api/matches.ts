import axios, { authConfig } from "./axios";

export interface MatchFormValues {
  name: string;
  logo: string;
}

/**
 * Fetches all matches.
 */
export const getMatches = async (): Promise<Match[]> => {
    const response = await axios.get<Match[]>('/matches');
    return response.data;
};

/**
 * Fetches team that matches id.
 */
export const getMatch = async (id: number): Promise<Match> => {
    const response = await axios.get<Match>(`/matches/${id}`);
    return response.data;
};
