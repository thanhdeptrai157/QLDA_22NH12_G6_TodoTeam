import { postService } from "@/service/post-service";
import { CreatePostPayload, Post } from "@/types/post";
import { useState } from "react";

export const usePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const createPost = async (data: CreatePostPayload) => {
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await postService.createPost(data);
            setMessage("Tạo bài viết thành công!");
            return response;
        } catch (err: any) {
            setError("Có lỗi xảy ra khi tạo bài viết.");
            return null;
        } finally {
            setIsLoading(false);
        }
    
    };

    const getDetailPost = async (id: number) => {
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await postService.getDetailPost(id);
            
            return response;
        } catch (err: any) {
            setError("Có lỗi xảy ra khi tạo bài viết.");
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const getPostByUserId = async (user_id: number) => {
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await postService.getAllUserPosts(user_id);
            return response;
        }
        catch(err: any){
            setError("Có lỗi xảy ra khi lấy bài viết.");
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const getTopPostsByLikes = async (limit?: number) => {
        setIsLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await postService.getTopPostsByLikes(limit);
            return response;
        } catch (err: any) {
            setError("Có lỗi xảy ra khi lấy top bài viết nhiều like nhất.");
            return null;
        } finally {
            setIsLoading(false);
        }
    };
    const getNewestPosts = async (limit?: number) => {
        setIsLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await postService.getNewestPosts(limit);
            return response;
        } catch (err: any) {
            setError("Có lỗi xảy ra khi lấy bài viết mới nhất.");
            return null;
        } finally {
            setIsLoading(false);
        }
    };
    return{
        isLoading,
        error,
        message,
        createPost,
        getDetailPost,
        getPostByUserId,
        getTopPostsByLikes,
        getNewestPosts
    }
}

