import api from "@/configs/axios";
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
        const response = await api.post(AUTH.REGISTER, {
            name,
            email,
            password,
            phone,
        });
        console.log("Register response", response);
        return response;
    } catch (error) {
        console.error("Register failed", error);
        throw error;
    }
}

const changePassword = async (id: number, oldPassword: string, newPassword: string) => {
    try {
        const response = await api.post(AUTH.CHANGE_PASSWORD(id), {
            oldPassword,
            newPassword,
        });
        return response;
    } catch (error) {
        console.error("Change password failed", error);
        throw error;
    }
}

const updateProfile = async (data: UserProfilePayload) => {
    try {
        const response = await api.put(AUTH.CHANGE_PROFILE(data.id), {
            name: data.name,
            phone: data.phone,
            bio: data.bio,
            address: data.address,
            avatar_path: data.avatar_path,
            cover_path: data.cover_path,
        });
        return response;
    } catch (error) {
        console.error("Update profile failed", error);
        throw error;
    }
}
export const authService = {
    login,
    register,
    changePassword,
    updateProfile,
};