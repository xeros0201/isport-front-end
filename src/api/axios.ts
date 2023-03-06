import _axios from 'axios';
const API = import.meta.env.VITE_ISPORTS_API_URL ?? 'http://localhost:3000/api';

export const authConfig = {
    withCredentials: true,
}

const axios = _axios.create({ baseURL: API });

export default axios;