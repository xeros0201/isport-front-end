import axios from "./axios";
const API = import.meta.env.VITE_ISPORTS_API_URL ?? 'http://localhost:3000/api';

/**
 * Fetches all leagues.
 */
export const getLeagues = async (): Promise<League[]> => {
    const response = await axios.get<League[]>(`${API}/league`);
    return response.data;
};