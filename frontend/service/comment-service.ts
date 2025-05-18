import api from "@/configs/axios";
import { COMMENT } from "@/constants/api-endpoint";
import { CreateComment } from "@/types/comment";
const createComment = async (data: CreateComment) => {
    try {
        const response = await api.post(COMMENT.CREATE_COMMENT, data);
        return response.data;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
}
const getComments = async (postId: number) => {
    try {
        const response = await api.get(COMMENT.GET_COMMENTS_BY_POST(postId));
        console.log("Response get comments", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

export const commentService = {
    createComment,
    getComments,
}