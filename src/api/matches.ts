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
 * Fetches validation to publish of match that matches id.
 */
export const getMatchValidation = async (
  id: number
): Promise<MatchValidation> => {
  const response = await axios.get<MatchValidation>(`/matches/${id}/_valid`);
  return response.data;
};

/**
 * Publish match that matches id.
 */
export const publishMatch = async (id: number): Promise<void> => {
  const response = await axios.get<void>(`/matches/${id}/_publish`);
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
  homePlayerIds: { [key: string]: string | undefined };
  awayPlayerIds: { [key: string]: string | undefined };
}
export const createMatch = async (
  match: CreateMatchFormValues
): Promise<Match> => {
  let formData = new FormData();
  match.date = dayjs(match.date).format("YYYY-MM-DD HH:mm");

  Object.keys(match).forEach((key) => {
    if (
      key !== "leagueId" &&
      key !== "homePlayerIds" &&
      key !== "awayPlayerIds" &&
      !!match[key as keyof CreateMatchFormValues]
    )
      formData.append(
        key,
        match[key as keyof CreateMatchFormValues] as string | Blob
      );
  });
  Object.keys(match.homePlayerIds).forEach((key) => {
    if (!!match.homePlayerIds[key])
      formData.append(
        `homePlayerIds[H${key}]`,
        match.homePlayerIds[key] as string
      );
  });
  Object.keys(match.awayPlayerIds).forEach((key) => {
    if (!!match.awayPlayerIds[key])
      formData.append(
        `awayPlayerIds[A${key}]`,
        match.awayPlayerIds[key] as string
      );
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
  homePlayerIds: { [key: string]: string | undefined };
  awayPlayerIds: { [key: string]: string | undefined };
}
export const updateMatch = async (
  id: number,
  match: UpdateMatchFormValues
): Promise<Match> => {
  let formData = new FormData();
  match.date = dayjs(match.date).format("YYYY-MM-DD HH:mm");

  Object.keys(match).forEach((key) => {
    if (
      key !== "leagueId" &&
      key !== "homePlayerIds" &&
      key !== "awayPlayerIds" &&
      !!match[key as keyof UpdateMatchFormValues]
    )
      formData.append(
        key,
        match[key as keyof UpdateMatchFormValues] as string | Blob
      );
  });
  Object.keys(match.homePlayerIds).forEach((key) => {
    if (!!match.homePlayerIds[key])
      formData.append(
        `homePlayerIds[H${key}]`,
        match.homePlayerIds[key] as string
      );
  });
  Object.keys(match.awayPlayerIds).forEach((key) => {
    if (!!match.awayPlayerIds[key])
      formData.append(
        `awayPlayerIds[A${key}]`,
        match.awayPlayerIds[key] as string
      );
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

/**
 * Delete specific player on matche.
 */
export const deletePlayerOnMatch = async (
  matchId: number,
  playerId: number
): Promise<Match> => {
  const response = await axios.delete<Match>(
    `/matches/${matchId}/players/${playerId}`
  );
  return response.data;
};

/**
 * Get aflResultProperties that belong to a match.
 */
export const getStats = async (matchId: number): Promise<Stats> => {
    const response = await axios.get<Stats>(`/matches/${matchId}/_stats`);
    return response.data;
};

export const getMatchById = async (matchId: number): Promise<Match> => {
    const response = await axios.get<Match>(`/matches/${matchId}`);
    return response.data;
};

// export const getResultPropsParent = async (): Promise<AflResultProperties[]> => {
//     const response = await axios.get<any>(`/matches/stat-props-parent`);
//     return response.data;
// };

// export const getResultPropsChildren = async (parentId: number): Promise<AflResultProperties[]> => {
//     const response = await axios.get<any>(`/matches/${parentId}/stat-props-children`);
//     return response.data;
// }