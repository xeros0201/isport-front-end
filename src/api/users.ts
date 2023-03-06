import axios, { authConfig } from "./axios";

export interface UserFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  status: "true" | ""
}


/**
 * Fetches all users.
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("/users");
  return response.data;
};

/**
 * Fetches user that matches id.
 */
export const getUser = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`/users/${id}`);
  return response.data;
};

/**
 * Creates new user.
 */
export const createUser = async (user: UserFormValues): Promise<User> => {
  const response = await axios.post<User>("/users", { ...user, active: !!user?.status }, authConfig);
  return response.data;
};

/**
 * Updates existing user.
 */
export const updateUser = async (id: number, user: UserFormValues): Promise<any> => {
  const response = await axios.put<any>(`/users/${id}`, { ...user, active: !!user?.status }, authConfig);
  return response.data;
};
