interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        avatarPath?: string;
        phone?: string;
        role: string;
    }
}

// Định nghĩa kiểu dữ liệu cho user
interface User {
    id: string;
    email: string;
    name: string;
    avatarPath?: string;
    phone?: string;
    role: string;
}
