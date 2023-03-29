import axios, { authConfig } from "./axios";

/**
 * Fetches all locations.
 */
export const getLocations = async (): Promise<Location[]> => {
  const response = await axios.get<Location[]>("/locations");
  return response.data;
};
