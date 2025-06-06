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
const getAllCategoryWithDetails = async () => {
    try {
        const response = await api.get(CATEGORY.GET_ALL_CATEGORY_WITH_DETAILS);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories with details:", error);
        throw error;
    }
}
const getTopCategories = async () => {
    try {
        const response = await api.get(CATEGORY.GET_TOP_CATEGORY);
        return response.data;
    } catch (error) {
        console.error("Error fetching top categories:", error);
        throw error;
    }
}
export const categoryService = {
    getAllCategories,
    getAllPostsByCategory,
    getAllCategoryWithDetails,
    getTopCategories
};