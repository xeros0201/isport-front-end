import axios from "./axios";

/**
 * Get matches that belong to a season.
 */
export const getMatchesBySeason = async (seasonId: number): Promise<Match[]> => {
    const response = await axios.get<Match[]>(`/seasons/${seasonId}/matches`);
    return response.data;
};