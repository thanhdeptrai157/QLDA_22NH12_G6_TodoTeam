import api from "@/configs/axios";
import { CATEGORY } from "@/constants/api-endpoint";

export const getAllCategories = async () => {
    try {
        const response = await api.get(CATEGORY.GET_CATEGORY);
        console.log("Categories fetched successfully:", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const categoryService = {
    getAllCategories,
};