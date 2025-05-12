import axios from "axios";
import { API_URL } from "./env";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/types/status";

// Create an axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Refresh token logic
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (newAccessToken: string) => {
    refreshSubscribers.forEach((cb) => cb(newAccessToken));
    refreshSubscribers = [];
};

const refreshAccessToken = async (): Promise<string | null> => {
    if (!isRefreshing) {
        isRefreshing = true;
        try {
            const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
            if (!refreshToken) throw new Error("No refresh token");

            const response = await axios.post(`${API_URL}/users/refresh-token/`, {
                refresh: refreshToken,
            });

            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;

            Cookies.set(ACCESS_TOKEN_KEY, newAccessToken);
            if (newRefreshToken) {
                Cookies.set(REFRESH_TOKEN_KEY, newRefreshToken);
            }

            onRefreshed(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("Refresh token failed:", error);
            return null;
        } finally {
            isRefreshing = false;
        }
    }

    return new Promise((resolve) => {
        subscribeTokenRefresh((token) => resolve(token));
    });
};

// Add request interceptor
api.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
