// frontend/app/posts/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { usePostsPagination } from "@/hooks/use-posts-pagination";
import { useTopCategories } from "@/hooks/use-category";
import { ChevronLeft, ChevronRight, Search, Filter, Grid, List, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PostsPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'created_at');
  const [sortOrder, setSortOrder] = useState(searchParams.get('order') || 'DESC');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { categories } = useTopCategories();
  const { 
    posts, 
    pagination, 
    isLoading, 
    error, 
    fetchPosts, 
    goToPage, 
    nextPage, 
    prevPage 
  } = usePostsPagination(9);

  // Fetch posts when component mounts or filters change
  useEffect(() => {
    const filters = {
      category_id: categoryFilter !== 'all' ? categoryFilter : undefined,
      search: searchTerm || undefined,
      sort_by: sortBy,
      sort_order: sortOrder
    };
    
    fetchPosts(1, 9, filters);
  }, [categoryFilter, sortBy, sortOrder]);

  const handleSearch = () => {
    const filters = {
      category_id: categoryFilter !== 'all' ? categoryFilter : undefined,
      search: searchTerm || undefined,
      sort_by: sortBy,
      sort_order: sortOrder
    };
    
    fetchPosts(1, 9, filters);
  };

  const handlePageChange = (page: number) => {
    const filters = {
      category_id: categoryFilter !== 'all' ? categoryFilter : undefined,
      search: searchTerm || undefined,
      sort_by: sortBy,
      sort_order: sortOrder
    };
    
    goToPage(page, filters);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const { currentPage, totalPages } = pagination;
    
    // Previous button
    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        disabled={!pagination.hasPrevPage}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Trước
      </Button>
    );

    // Page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant={1 === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );
      
      if (startPage > 2) {
        buttons.push(
          <span key="dots1" className="px-2 text-muted-foreground">...</span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="dots2" className="px-2 text-muted-foreground">...</span>
        );
      }
      
      buttons.push(
        <Button
          key={totalPages}
          variant={totalPages === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        disabled={!pagination.hasNextPage}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex items-center gap-2"
      >
        Sau
        <ChevronRight className="h-4 w-4" />
      </Button>
    );

    return buttons;
  };
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        {/* Search Bar Skeleton */}
        <div className="mb-8">
          <div className="h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl animate-pulse shadow-lg"></div>
        </div>

        {/* Loading Animation với Icon */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6 shadow-lg">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Đang tìm kiếm...
          </h3>
          <p className="text-gray-500">
            Vui lòng chờ trong giây lát
          </p>
          
          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              {/* Image skeleton */}
              <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
              
              {/* Content skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 animate-pulse"></div>
                
                {/* Tags skeleton */}
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse"></div>
                </div>
                
                {/* Stats skeleton */}
                <div className="flex justify-between pt-2">
                  <div className="h-4 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating particles effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-50"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tất cả bài viết</h1>
            <p className="text-muted-foreground">
              Khám phá {pagination.totalItems} trải nghiệm du lịch từ cộng đồng
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/posts/create">
                Tạo bài viết mới
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-9"
                />
              </div>
              <Button onClick={handleSearch}>
                Tìm kiếm
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Danh mục</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sắp xếp theo</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Ngày tạo</SelectItem>
                      <SelectItem value="likes">Số lượt thích</SelectItem>
                      <SelectItem value="stars">Đánh giá</SelectItem>
                      <SelectItem value="title">Tiêu đề</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Thứ tự</label>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DESC">Giảm dần</SelectItem>
                      <SelectItem value="ASC">Tăng dần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Thử lại
          </Button>
        </div>
      )}

      {/* Posts Grid/List */}
      {!isLoading && !error && (
        <>
          {posts.length > 0 ? (
            <div className={`mb-8 ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}>
              {posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  layout={viewMode === 'list' ? 'horizontal' : 'vertical'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Không tìm thấy bài viết nào phù hợp
              </p>
              <Button asChild>
                <Link href="/posts/create">
                  Tạo bài viết đầu tiên
                </Link>
              </Button>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                {renderPaginationButtons()}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Hiển thị {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} 
                {' '}trong tổng số {pagination.totalItems} bài viết
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}