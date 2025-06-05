"use client";

import { categoryService } from "@/service/category-service";
import { Category } from "@/types/post";
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
    return {
        isLoading,
        error,
        category,
    };
};

export const useCategoryWithPostCount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            setError("");
            try {
                const response = await categoryService.getAllPostsByCategory();
                setCategories(response.data);
                return response;
            } catch (err: any) {
                setError("Có lỗi xảy ra khi lấy danh sách danh mục kèm số lượng bài viết.");
                return null;
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);
    return {
        isLoading,
        error,
        categories,
    };
};
export const useCategoryWithDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            setError("");
            try {
                const response = await categoryService.getAllCategoryWithDetails();
                setCategories(response.data);
                return response;
            } catch (err: any) {
                setError("Có lỗi xảy ra khi lấy danh sách danh mục với chi tiết.");
                return null;
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);
    return {
        isLoading,
        error,
        categories,
    };
}
export const useTopCategories = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            setError("");
            try {
                const response = await categoryService.getTopCategories();
                setCategories(response.data);
                return response;
            } catch (err: any) {
                setError("Có lỗi xảy ra khi lấy danh sách danh mục hàng đầu.");
                return null;
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);
    return {
        isLoading,
        error,
        categories,
    };
};
