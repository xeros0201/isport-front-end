import axios, { authConfig } from "./axios";

export interface LeagueFormValues {
  name: string;
  logo: string | File;
}

/**
 * Fetches all leagues.
 */
export const getLeagues = async (): Promise<League[]> => {
  const response = await axios.get<League[]>("/leagues");
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
export const createLeague = async (league: {
  name: string;
  logo: string | File;
}): Promise<League> => {
  const sportId = import.meta.env.VITE_ISPORTS_AFL_ID;
  const formData = new FormData();
  formData.append("name", league.name);
  formData.append("logo", league.logo);
  formData.append("sportId", sportId);
  const response = await axios.post<League>("/leagues", formData, {
    ...authConfig,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/**
 * Updates existing league.
 */
export const updateLeague = async (
  id: number,
  league: { name: string; logo: string | File }
): Promise<League> => {
  const formData = new FormData();
  formData.append("name", league.name);
  formData.append("logo", league.logo);

  const response = await axios.put<League>(`/leagues/${id}`, formData, {
    ...authConfig,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
