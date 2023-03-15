import dayjs from "dayjs";
import axios, { authConfig } from "./axios";

export interface MatchFormValues {
  homeTeamCsv: File | string;
  awayTeamCsv: File | string;
  seasonId: string;
  homeTeamId: string;
  awayTeamId: string;
  leagueId: string;
  round: string;
  type: string;
  locationId: string;
  date: string;
}

/**
 * Fetches all matches.
 */
export const getMatches = async (): Promise<Match[]> => {
  const response = await axios.get<Match[]>("/matches");
  return response.data;
};

/**
 * Fetches match that matches id.
 */
export const getMatch = async (id: number): Promise<Match> => {
  const response = await axios.get<Match>(`/matches/${id}`);
  return response.data;
};

/**
 * Creates new match.
 */
interface CreateMatchFormValues {
  homeTeamCsv: File | string;
  awayTeamCsv: File | string;
  seasonId: string;
  homeTeamId: string;
  awayTeamId: string;
  round: string;
  type: string;
  locationId: string;
  date: string;
}
export const createMatch = async (
  match: CreateMatchFormValues
): Promise<Match> => {
  let formData = new FormData();
  match.date = dayjs(match.date).format("YYYY-MM-DD HH:mm");
  Object.keys(match).forEach((key) => {
    if (key !== "leagueId")
      formData.append(key, match[key as keyof CreateMatchFormValues]);
  });

  const response = await axios.post<Match>("/matches", formData, {
    ...authConfig,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Updates existing match.
 */
interface UpdateMatchFormValues {
  homeTeamCsv: File | string;
  awayTeamCsv: File | string;
  seasonId: string;
  homeTeamId: string;
  awayTeamId: string;
  round: string;
  type: string;
  locationId: string;
  date: string;
}
export const updateMatch = async (
  id: number,
  match: UpdateMatchFormValues
): Promise<Match> => {
  let formData = new FormData();
  match.date = dayjs(match.date).format("YYYY-MM-DD HH:mm");
  Object.keys(match).forEach((key) => {
    if (key !== "leagueId")
      formData.append(key, match[key as keyof UpdateMatchFormValues]);
  });
  const response = await axios.put<Match>(
    `/matches/${id}`,
    formData,
    authConfig
  );
  return response.data;
};

/**
 * Get matches that belong to a season.
 */
export const getMatchesBySeason = async (
  seasonId: number
): Promise<Match[]> => {
  const response = await axios.get<Match[]>(`/seasons/${seasonId}/matches`);
  return response.data;
};
