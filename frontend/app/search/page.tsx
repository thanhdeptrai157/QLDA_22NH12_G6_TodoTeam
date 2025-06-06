"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import { PostCard } from "@/components/post-card"
import { Post } from "@/types/post"
import { API_URL } from "@/configs/env"
import { Search, MapPin, Filter, Loader2 } from "lucide-react"

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Lấy params
  const locationName = searchParams.get("locationName") || ""
  const category_id = searchParams.get("category_id") || "all"
  const stars = searchParams.get("stars") || "all"

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)
      try {
        let url = ""
        let res

        const isLocationEmpty = !locationName || locationName.trim() === ""
        const isCategoryAll = !category_id || category_id === "all"
        const isStarsAll = !stars || stars === "all"

        if (isLocationEmpty && isCategoryAll && isStarsAll) {
          // Lấy tất cả bài viết
          url = `${API_URL}posts`
        } else {
          // Advanced search cho mọi trường hợp còn lại
          const params = new URLSearchParams()
          if (!isLocationEmpty) params.set("locationName", locationName.trim())
          if (!isCategoryAll) params.set("category_id", category_id)
          if (!isStarsAll) params.set("stars", stars)
          url = `${API_URL}search/advanced?${params.toString()}`
        }
        res = await fetch(url)
        if (!res.ok) throw new Error("Lỗi khi tìm kiếm bài viết")
        const data = await res.json()
        setPosts(data)
      } catch (err: any) {
        setError(err.message || "Đã có lỗi xảy ra")
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [locationName, category_id, stars])

  // ✅ Loading State đẹp mắt
  if (loading) {
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
      <SearchBar />
      
      <div className="mt-8">
        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500 mb-6">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Đà Nẵng</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Hà Nội</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Sapa</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">Phú Quốc</span>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && posts.length > 0 && (
          <>
            {/* Results Header */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Kết quả tìm kiếm
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Tìm thấy <span className="font-semibold text-blue-600">{posts.length}</span> bài viết
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Filter className="w-4 h-4" />
                  <span>Đã lọc</span>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <div 
                  key={post.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
          <p className="text-gray-600">Đang tải trang...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}