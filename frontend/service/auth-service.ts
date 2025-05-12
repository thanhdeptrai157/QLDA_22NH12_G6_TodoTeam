import api from "@/configs/axios";
import Cookies from "js-cookie";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/types/status";
import { AUTH } from "@/constants/api-endpoint";



const login = async (email: string, password: string) => {
    try {
        const response = await api.post<AuthResponse>(AUTH.LOGIN, {
            email,
            password,
        });
        return response;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
}
const register = async (name: string, email: string, password: string, phone: string) => {
    try {
        const response = await api.post<AuthResponse>(AUTH.REGISTER, {
            name,
            email,
            password,
            phone,
        });
        return response;
    } catch (error) {
        console.error("Register failed", error);
        throw error;
    }
}
export const authService = {
    login,
    register,
    
};