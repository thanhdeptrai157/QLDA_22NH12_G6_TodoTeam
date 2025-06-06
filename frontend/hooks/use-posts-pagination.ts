// frontend/hooks/use-posts-pagination.ts
import { useState, useEffect } from 'react';
import { postService } from '@/service/post-service';
import { Post } from '@/types/post';

interface Filters {
  category_id?: string;
  search?: string;
  sort_by?: string;
  sort_order?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const usePostsPagination = (initialLimit = 9) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: initialLimit,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async (
    page: number = 1, 
    limit: number = initialLimit, 
    filters: Filters = {}
  ) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await postService.getAllPostsWithPagination(page, limit, filters);
      console.log('Fetched posts:', response);
      setPosts(response.data);
      setPagination(response.pagination);
    } catch (err: any) {
      setError('Có lỗi xảy ra khi tải bài viết');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = (page: number, filters: Filters = {}) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchPosts(page, pagination.itemsPerPage, filters);
    }
  };

  const nextPage = (filters: Filters = {}) => {
    if (pagination.hasNextPage) {
      goToPage(pagination.currentPage + 1, filters);
    }
  };

  const prevPage = (filters: Filters = {}) => {
    if (pagination.hasPrevPage) {
      goToPage(pagination.currentPage - 1, filters);
    }
  };

  const refreshPosts = (filters: Filters = {}) => {
    fetchPosts(pagination.currentPage, pagination.itemsPerPage, filters);
  };

  return {
    posts,
    pagination,
    isLoading,
    error,
    fetchPosts,
    goToPage,
    nextPage,
    prevPage,
    refreshPosts
  };
};