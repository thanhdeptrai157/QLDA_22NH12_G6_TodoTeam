"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { CategoryHighlight } from "@/components/category-highlight"
import { HeroSection } from "@/components/hero-section"
import { useAuthStore } from "@/store/user"
import { useCategoryWithPostCount } from "@/hooks/use-category"
import { usePost } from "@/hooks/use-post";
import { useEffect, useState } from "react";

export default function Home() {
  // Mock data for featured posts
  const { user } = useAuthStore();
  const { categories: popularCategories, isLoading: isCategoryLoading } = useCategoryWithPostCount();
  const { getTopPostsByLikes, getNewestPosts } = usePost();
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  const [newestPosts, setNewestPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchTopPosts = async () => {
      const posts = await getTopPostsByLikes(3);
      setFeaturedPosts(posts || []);
    };
    fetchTopPosts();
  }, []);

  useEffect(() => {
    const fetchNewestPosts = async () => {
      const posts = await getNewestPosts(4);
      setNewestPosts(posts || []);
    };
    fetchNewestPosts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-12">
          <Card className="border-none shadow-lg bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Tìm kiếm địa điểm du lịch</h2>
              <SearchBar />
            </CardContent>
          </Card>
        </section>

        {/* Categories Highlight */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Khám phá theo danh mục</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/categories">Xem tất cả</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {isCategoryLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mb-2" />
                  <div className="w-20 h-4 rounded bg-gray-300 dark:bg-gray-600" />
                </div>
              ))
            ) : (
              popularCategories?.map((category) => (
                <CategoryHighlight key={category.id || category.slug} category={category} />
              ))
            )}
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trải nghiệm nổi bật</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/posts">Xem tất cả</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.length === 0 ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-64 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse flex flex-col p-4 gap-4"
                >
                  <div className="h-32 w-full rounded-lg bg-gray-300 dark:bg-gray-600 mb-2" />
                  <div className="h-6 w-2/3 rounded bg-gray-300 dark:bg-gray-600 mb-1" />
                  <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600" />
                  <div className="flex gap-2 mt-auto">
                    <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-600" />
                  </div>
                </div>
              ))
            ) : (
              featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trải nghiệm mới nhất</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/posts">Xem tất cả</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newestPosts.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-64 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse p-4 gap-4"
                >
                  <div className="h-32 w-full rounded-lg bg-gray-300 dark:bg-gray-600 mb-2" />
                  <div className="h-6 w-2/3 rounded bg-gray-300 dark:bg-gray-600 mb-1" />
                  <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600" />
                  <div className="flex gap-2 mt-auto">
                    <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-600" />
                  </div>
                </div>
              ))
            ) : (
              newestPosts.map((post) => (
                <PostCard key={post.id} post={post} layout="horizontal" />
              ))
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-xl p-8 text-center bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bạn đã có trải nghiệm du lịch thú vị?</h2>
            <p className="text-lg mb-6">
              Hãy chia sẻ câu chuyện của bạn và giúp người khác khám phá những địa điểm tuyệt vời!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/posts/create">Chia sẻ ngay</Link>
              </Button>
              {!user && <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <Link href="/auth/register">Đăng ký tài khoản</Link>
              </Button>}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

