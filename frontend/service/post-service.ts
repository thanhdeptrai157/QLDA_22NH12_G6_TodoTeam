import api from "@/configs/axios";
import { POST } from "@/constants/api-endpoint";
import { Post } from "@/types/post";

const getAllPosts = async () => {
    try {
        const response = await api.get(POST.GET_POST);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}


const createPost = async (data: Post) => {
    try {
        const response = await api.post(POST.CREATE_POST, data);
        return response.data;
    }
    catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}


export const postService = {
    getAllPosts,
    createPost,
};