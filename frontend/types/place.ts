import { Post } from "./post";

export interface Place {
    id?: number; // Thêm id để dùng cho key và link
    name: string;
    address: string;
    average_stars: number;
    longitude: number;
    latitude: number;
    postCount: number;
    posts: Post[];
    images?: string[]; // Thêm trường images để nhận nhiều ảnh từ backend
}
export interface PlaceExplore {
    id: number;
    name: string;
    address: string;
    rating: number;
    reviewCount?: number;
    image: string;
}