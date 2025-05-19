import { commentService } from "@/service/comment-service";
import { CreateComment } from "@/types/comment";
import { useState } from "react";

export const useComment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const createComment = async (data: CreateComment) => {
        setIsLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await commentService.createComment(data);
            setMessage("Tạo bình luận thành công!");
            return response;
        } catch (err: any) {
            setError("Có lỗi xảy ra khi tạo bình luận.");
            return null;
        } finally {
            setIsLoading(false);
        }
        
    }
const getComments = async (postId: number) => {
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
        const response = await commentService.getComments(postId);
        console.log("Response get comments", response);
        return response;
    } catch (err: any) {
        setError("Có lỗi xảy ra khi lấy bình luận.");
        return null;
    } finally {
        setIsLoading(false);
    }
    }
    return {
        isLoading,
        error,
        message,
        createComment,
        getComments
    }
}