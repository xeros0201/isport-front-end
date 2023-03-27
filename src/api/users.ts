import { Role } from "../types/enums";
import axios, { authConfig } from "./axios";

export interface UserFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  active: "true" | "";
  role: Role;
}

/**
 * Fetches all users.
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("/users", authConfig);
  return response.data;
};

/**
 * Fetches user that matches id.
 */
export const getUser = async (id: string): Promise<User> => {
  const response = await axios.get<User>(`/users/${id}`, authConfig);
  return response.data;
};

/**
 * Creates new user.
 */
export const createUser = async (user: UserFormValues): Promise<User> => {
  const response = await axios.post<User>("/users", { ...user, active: !!user?.active }, authConfig);
  return response.data;
};

/**
 * Updates existing user.
 */
export const updateUser = async (id: string, user: UserFormValues): Promise<any> => {
  const response = await axios.put<any>(`/users/${id}`, { ...user, active: !!user?.active }, authConfig);
  return response.data;
};
