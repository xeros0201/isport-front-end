import axios, { authConfig } from "./axios";

export interface SeasonFormValues {
    name: string;
    startDate: string;
    endDate: string;
    leagueId: string;
  }

/**
 * Fetches all seasons.
 */
export const getSeasons = async (): Promise<Season[]> => {
    const response = await axios.get<Season[]>('/seasons');
    return response.data;
};

/**
 * Gets season that matches id.
 */
export const getSeason = async (id: number): Promise<Season> => {
    const response = await axios.get<Season>(`/seasons/${id}`);
    return response.data;
};

/**
 * Creates a season.
 */
export const createSeasons = async (data: SeasonFormValues): Promise<Season[]> => {
    const response = await axios.post<Season[]>('/seasons', data, authConfig);
    return response.data;
};

/**
 * Updates existing season.
 */
export const updateSeason = async (id: number, season: SeasonFormValues): Promise<Season> => {
    const response = await axios.patch<Season>(`/seasons/${id}`, season, authConfig);
    return response.data;
}