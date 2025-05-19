import api from "@/configs/axios";
import { POST } from "@/constants/api-endpoint";
import { CreatePostPayload, Post } from "@/types/post";

const getAllUserPosts = async (user_id: number) => {
    try {
        const response = await api.get(POST.GET_POST_BY_USER(user_id));
        return response.data;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

const getDetailPost = async (id: number) =>{
    try{
        const response = await api.get(POST.GET_DETAIL_POST(id));
        return response.data
    }
    catch(error){
        console.log(error)
        throw error
    }
}
const createPost = async (data: CreatePostPayload) => {
    try {
        const response = await api.post(POST.CREATE_POST, data);
        
        return response.data;
    }
    catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}
const getTopPostsByLikes = async (limit?: number) => {
    try {
        const response = await api.get(POST.GET_TOP_POSTS_BY_LIKES(limit));
        return response.data;
    } catch (error) {
        console.error("Error fetching top posts by likes:", error);
        throw error;
    }
}

const getNewestPosts = async (limit?: number) => {
    try {
        const response = await api.get(POST.GET_NEWEST_POSTS(limit));
        return response.data;
    } catch (error) {
        console.error("Error fetching newest posts:", error);
        throw error;
    }
};

export const postService = {
    getAllUserPosts,
    createPost,
    getDetailPost,
    getTopPostsByLikes,
    getNewestPosts
};