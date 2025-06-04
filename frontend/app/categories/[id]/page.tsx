"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { MapPin } from "lucide-react"
import { useCategoryWithPostCount } from "@/hooks/useCategory"
import { usePost } from "@/hooks/usePost"
import { use, useEffect, useState } from "react"

interface CategoryPageProps {
  params: Promise<{
    id: string
  }>
}

// Sửa hàm để sử dụng number thay vì string
const getCategoryBgClass = (categoryId: number) => {
  const colors: Record<number, string> = {
    1: "bg-blue-500",    // Biển
    2: "bg-green-500",   // Núi
    3: "bg-purple-500",  // Thành phố
    4: "bg-yellow-500",  // Đảo
    5: "bg-amber-800",   // Làng quê
  }
  return colors[categoryId] || "bg-primary"
}

const getCategoryHoverClass = (categoryId: number) => {
  const colors: Record<number, string> = {
    1: "hover:bg-blue-100",
    2: "hover:bg-green-100",
    3: "hover:bg-purple-100",
    4: "hover:bg-yellow-100",
    5: "hover:bg-amber-100",
  }
  return colors[categoryId] || "hover:bg-primary/10"
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params)
  const categoryId = Number(resolvedParams.id)
  const [posts, setPosts] = useState<any[]>([])
  const { categories: popularCategories, isLoading: isCategoryLoading } = useCategoryWithPostCount()
  const { isLoading: isPostLoading, error, getPostsByCategory } = usePost()
  // Find current category
  const currentCategory = popularCategories?.find((cat) => cat.id === categoryId) || {
    id: categoryId,
    name: "Không tìm thấy",
    count: 0,
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostsByCategory(categoryId)
        console.log(fetchedPosts)
        setPosts(fetchedPosts)
        console.log('Fetched posts:', fetchedPosts)
      } catch (err) {
        console.error("Error fetching posts:", err)
      }
    }

    if (categoryId) {
      fetchPosts()
    }
  }, [categoryId])
  console.log("Posts:", posts)
  // Loading state
  if (isCategoryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="h-96 bg-gray-200 rounded-xl"></div>
            <div className="md:col-span-3 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`${getCategoryBgClass(currentCategory.id)} text-white rounded-xl p-8 mb-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <MapPin className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{currentCategory.name}</h1>
            <p className="text-white/80">{currentCategory.count} bài viết</p>
          </div>
        </div>
        <p className="max-w-2xl">
          Khám phá những trải nghiệm tuyệt vời tại các địa điểm {currentCategory.name?.toLowerCase()} nổi tiếng. Chia sẻ
          và tìm kiếm những góc nhìn mới về những điểm đến hấp dẫn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 order-2 md:order-1">
          <div className="sticky top-20">
            <h2 className="text-xl font-bold mb-4">Danh mục</h2>
            <div className="space-y-2">
              {popularCategories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className={`block p-3 rounded-lg transition-colors ${
                    category.id === categoryId
                      ? getCategoryBgClass(category.id) + " text-white"
                      : getCategoryHoverClass(category.id)
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className={`text-sm ${category.id === categoryId ? "text-white/80" : "text-muted-foreground"}`}>
                      {category.count}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Tìm kiếm</h2>
              <SearchBar />
            </div>

            <div className="mt-8 p-4 bg-primary/10 rounded-lg">
              <h3 className="font-bold mb-2">Chia sẻ trải nghiệm của bạn</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hãy chia sẻ những trải nghiệm du lịch tuyệt vời của bạn với cộng đồng.
              </p>
              <Button asChild>
                <Link href="/posts/create">Tạo bài viết mới</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 order-1 md:order-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Bài viết về {currentCategory.name}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Mới nhất
              </Button>
              <Button variant="outline" size="sm">
                Phổ biến
              </Button>
            </div>
          </div>

          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Có lỗi xảy ra khi tải bài viết</p>
            </div>
          )}

          {isPostLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} layout="horizontal" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Không có bài viết nào trong danh mục này</p>
              <Button asChild>
                <Link href="/posts/create">Tạo bài viết đầu tiên</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}