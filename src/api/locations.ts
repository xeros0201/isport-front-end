import axios, { authConfig } from "./axios";

/**
 * Fetches all locations.
 */
export const getLocations = async (): Promise<Location[]> => {
  const response = await axios.get<Location[]>("/locations");
  return response.data;
};

/**
 * Creates one location.
 */
export const createLocation = async (name: string) : Promise<Location> => {
  const response = await axios.post<Location>("/locations", {name});
  return response.data;
}
