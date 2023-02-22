import axios from "./axios";

/**
 * Fetches all users.
 * TODO: add interface replace any
 */
export const getUsers = async (): Promise<any[]> => {
  const response = await axios.get<any[]>("/users");
  return response.data;
};

/**
 * Fetches user that matches id.
 * TODO: add interface replace any
 */
export const getUser = async (id: number): Promise<any> => {
  const response = await axios.get<any>(`/users/${id}`);
  return response.data;
};

/**
 * Creates new user.
 * TODO: add interface replace any
 */
export const createUser = async (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  active: boolean;
}): Promise<any> => {
  const response = await axios.post<any>("/users", { ...user });
  return response.data;
};

/**
 * Updates existing user.
 * TODO: add interface replace any
 */
export const updateUser = async (
  id: number,
  user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    active: boolean;
  }
): Promise<any> => {
  const response = await axios.put<any>(`/users/${id}`, user);
  return response.data;
};
