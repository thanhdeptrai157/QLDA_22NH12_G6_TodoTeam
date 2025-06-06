"use client";

import { authService } from "@/service/auth-service";
import { useAuthStore } from "@/store/user";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/types/status";
import Cookies from "js-cookie";
import { useState } from "react";

export function useAuth() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const setUser = useAuthStore((state) => state.setUser);
    const logout = useAuthStore((state) => state.logout);
    // Đăng nhập
    const handleLogin = async (username: string, password: string) => {
        setIsLoading(true);
        setMessage("");
        setError("");

        try {
            const result = await authService.login(username, password);

            const access = result?.data?.accessToken;
            const refresh = result?.data?.refreshToken;
            setUser(result?.data?.user);
            if (!access || !refresh) {
                setError("Tài khoản hoặc mật khẩu không đúng.");
                return false;
            }
            // Lưu vào cookie
            Cookies.set(ACCESS_TOKEN_KEY, access);
            Cookies.set(REFRESH_TOKEN_KEY, refresh);

            setMessage("Đăng nhập thành công!");
            return true;
        } catch (err: any) {
            setError("Tài khoản hoặc mật khẩu không đúng.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Đăng ký
    const handleRegister = async (
        name: string,
        email: string,
        password: string,
        phone: string
    ) => {
        setIsLoading(true);
        setMessage("");
        setError("");

        try {
            await authService.register(name, email, password, phone);
            
            setMessage("Đăng ký thành công! Vui lòng kiểm tra email.");
            return true;
        } catch (err: any) {
            setError(err.response?.data?.error || "Đã xảy ra lỗi khi đăng ký.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout()
        Cookies.remove(ACCESS_TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
    };
    return {
        isLoading,
        message,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
    };
}
