import axios, { authConfig } from "./axios";

type LoginArgs = {
    email: string;
    password: string;
};

/**
 * Logs in a user.
 */
export const login = ({email, password}: LoginArgs): Promise<User> => {
    return axios.post<User>('/auth/login', { email, password }, authConfig)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
};

/**
 * Checks a user's auth status.
 */
export const checkAuth = (): Promise<{ status: boolean; user: User | null}> => {
    return axios.get<User>('/auth/check', authConfig)
        .then((response) => ({
            status: response.status === 200,
            user: response.data
        }))
        .catch(() => ({ status: false, user: null }));
};

/**
 * Logs a user out.
 */
export const logout = async (): Promise<boolean> => {
    return axios.delete<User>('/auth/logout', authConfig)
        .then((response) => response.status === 200)
        .catch(() => false);
};

export const getRoles = async (): Promise<string[]> => {
  const response = await axios.get<string[]>("/auth/roles", authConfig);
  return response.data;
};