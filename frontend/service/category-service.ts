import api from "@/configs/axios";
import { CATEGORY } from "@/constants/api-endpoint";

export const getAllCategories = async () => {
    try {
        const response = await api.get(CATEGORY.GET_CATEGORY);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const getAllPostsByCategory = async () => {
    try {
        const response = await api.get(CATEGORY.GET_ALL_NUM_POST_BY_CATEGORY);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts by category:", error);
        throw error;
    }
}
export const categoryService = {
    getAllCategories,
    getAllPostsByCategory,
};