import axios from "./axios";

/**
 * Get matches that belong to a season.
 */
export const getMatchesBySeason = async (seasonId: number): Promise<Match[]> => {
    const response = await axios.get<Match[]>(`/seasons/${seasonId}/matches`);
    return response.data;
};

/**
 * Get aflResultProperties that belong to a match.
 */
export const getStats = async (matchId: number): Promise<Stats> => {
    const response = await axios.get<Stats>(`/matches/${matchId}/_stats`);
    return response.data;
};
