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
    return{
        isLoading,
        error,
        message,
        createPost,
        getDetailPost
    }
}

