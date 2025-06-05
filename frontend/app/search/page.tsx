"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import { PostCard } from "@/components/post-card"
import { Post } from "@/types/post"

export default function SearchPage() {
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
          url = `http://localhost:8000/posts`
        } else {
          // Advanced search cho mọi trường hợp còn lại
          const params = new URLSearchParams()
          if (!isLocationEmpty) params.set("locationName", locationName.trim())
          if (!isCategoryAll) params.set("category_id", category_id)
          if (!isStarsAll) params.set("stars", stars)
          url = `http://localhost:8000/search/advanced?${params.toString()}`
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

  return (
    <div className="container py-6">
      <SearchBar />
      <div className="mt-6">
        {loading && <div>Đang tải kết quả...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && posts.length === 0 && (
          <div>Không tìm thấy bài viết phù hợp.</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}