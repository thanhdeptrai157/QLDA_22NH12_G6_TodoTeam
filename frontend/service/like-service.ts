import api from "@/configs/axios";
import { LIKE } from "@/constants/api-endpoint";
import { CreateLike } from "@/types/like";

const createLike = async (data: CreateLike) => {
    try {
        const response = await api.post(LIKE.CREATE_LIKE, data);
        return response.data;
    } catch (error) {
        console.error("Error creating like:", error);
        throw error;
    }
}
const deleteLike = async (data: CreateLike) => {
    try {   
        const response = await api.delete(LIKE.DELETE_LIKE(data.is_post, data.user_id, data.target_id));
        return response.data;
    } catch (error) {
        console.error("Error deleting like:", error);
        throw error;
    }
}
export const likeService = {
    createLike,
    deleteLike,
}