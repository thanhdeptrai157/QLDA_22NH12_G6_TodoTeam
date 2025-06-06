interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

// Định nghĩa kiểu dữ liệu cho user
interface User {
    id: string;
    email: string;
    name: string;
    avatar_path?: string;
    phone?: string;
    role: string;
    bio?: string;
    address?: string;
    cover_path?: string;
}

interface UserProfilePayload {
    id: number;
    name: string;
    phone: string;
    bio?: string;
    address?: string;
    avatar_path?: string;
    cover_path?: string;
}

