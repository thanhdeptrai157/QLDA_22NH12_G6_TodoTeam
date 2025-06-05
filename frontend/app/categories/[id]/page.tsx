"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { useCategoryWithPostCount } from "@/hooks/useCategory"
import api from "@/configs/axios"

interface CategoryPageProps {
  params: {
    id: string // slug chính là id bây giờ
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = params.id
  const { categories: popularCategories } = useCategoryWithPostCount()
  const [posts, setPosts] = useState<any[]>([])
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/posts/category/${categoryId}`)
        setPosts(res.data || [])
        setCategory(res.data?.[0]?.category || null)
      } catch {
        setPosts([])
        setCategory(null)
      } finally {
        setLoading(false)
      }
    }
    fetchCategoryAndPosts()
  }, [categoryId])

  // Luôn ép kiểu categoryId về số khi so sánh với cat.id (BE trả về int)
  const fallbackCategory = popularCategories.find((cat) => cat.id === Number(categoryId))
  const currentCategory = category || fallbackCategory || {
    name: "Không tìm thấy",
    slug: "not-found",
    count: 0,
    id: null,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-primary text-white rounded-xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <MapPin className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{currentCategory.name}</h1>
            <p className="text-white/80">{posts.length} bài viết</p>
          </div>
        </div>
        <p className="max-w-2xl">
          Khám phá những trải nghiệm tuyệt vời tại các địa điểm {currentCategory.name.toLowerCase()} nổi tiếng.
          Chia sẻ và tìm kiếm những góc nhìn mới về những điểm đến hấp dẫn.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 order-2 md:order-1">
          <div className="sticky top-20">
            <h2 className="text-xl font-bold mb-4">Danh mục</h2>
            <div className="space-y-2">
              {popularCategories.map((cat) => {
                const isActive = cat.id === Number(categoryId)
                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    className={`block p-3 rounded-lg transition-colors ${isActive ? "bg-primary text-white" : "hover:bg-primary/10"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{cat.name}</span>
                      <span className={`text-sm ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                        {cat.count}
                      </span>
                    </div>
                  </Link>
                )
              })}
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
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 order-1 md:order-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Bài viết về {currentCategory.name}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Mới nhất</Button>
              <Button variant="outline" size="sm">Phổ biến</Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">Đang tải bài viết...</div>
          ) : posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} layout="horizontal" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              {currentCategory.id === "not-found" ? (
                <>
                  <p className="text-muted-foreground mb-4">Không tìm thấy danh mục này.</p>
                  <Button asChild>
                    <Link href="/">Quay về trang chủ</Link>
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">Không có bài viết nào trong danh mục này</p>
                  <Button asChild>
                    <Link href="/posts/create">Tạo bài viết đầu tiên</Link>
                  </Button>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}