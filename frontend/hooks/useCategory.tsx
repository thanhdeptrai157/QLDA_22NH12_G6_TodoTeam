import { categoryService } from "@/service/category-service";
import { Category} from "@/types/post";
import { useEffect, useState } from "react";

export const useCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            setError("");
        
            try {
                const response = await categoryService.getAllCategories();
                setCategory(response.data);
                return response;
            } catch (err: any) {
                setError("Có lỗi xảy ra khi lấy danh sách danh mục.");
                return null;
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return{
        isLoading,  
        error,
        category,
    }
}
