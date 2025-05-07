import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { CategoryHighlight } from "@/components/category-highlight"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  // Mock data for featured posts
  const featuredPosts = [
    {
      id: 1,
      title: "Khám phá vẻ đẹp hoang sơ của Vịnh Hạ Long",
      content: "Trải nghiệm tuyệt vời với những hòn đảo đá vôi và hang động kỳ thú...",
      likes: 245,
      createdAt: "2025-03-15",
      updatedAt: "2025-03-15",
      status: true,
      author: {
        id: 1,
        name: "Nguyễn Văn A",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      place: {
        id: 1,
        name: "Vịnh Hạ Long",
        address: "Quảng Ninh, Việt Nam",
        averageStar: 4.8,
      },
      category: {
        name: "Biển",
        slug: "beach",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
    {
      id: 2,
      title: "Sapa - Thiên đường mây trắng",
      content: "Những trải nghiệm không thể quên với ruộng bậc thang và văn hóa dân tộc...",
      likes: 189,
      createdAt: "2025-03-10",
      updatedAt: "2025-03-10",
      status: true,
      author: {
        id: 2,
        name: "Trần Thị B",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      place: {
        id: 2,
        name: "Sapa",
        address: "Lào Cai, Việt Nam",
        averageStar: 4.6,
      },
      category: {
        name: "Núi",
        slug: "mountain",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
    {
      id: 3,
      title: "Phố cổ Hội An - Nơi thời gian ngừng lại",
      content: "Khám phá nét đẹp cổ kính và yên bình của phố cổ Hội An...",
      likes: 320,
      createdAt: "2025-03-05",
      updatedAt: "2025-03-05",
      status: true,
      author: {
        id: 3,
        name: "Lê Văn C",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      place: {
        id: 3,
        name: "Phố cổ Hội An",
        address: "Quảng Nam, Việt Nam",
        averageStar: 4.9,
      },
      category: {
        name: "Thành phố",
        slug: "city",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
    {
      id: 4,
      title: "Phú Quốc - Thiên đường biển đảo",
      content: "Khám phá bãi biển cát trắng và nước biển trong xanh tại Phú Quốc...",
      likes: 278,
      createdAt: "2025-03-02",
      updatedAt: "2025-03-02",
      status: true,
      author: {
        id: 4,
        name: "Hoàng Thị D",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      place: {
        id: 4,
        name: "Phú Quốc",
        address: "Kiên Giang, Việt Nam",
        averageStar: 4.7,
      },
      category: {
        name: "Đảo",
        slug: "island",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
    {
      id: 5,
      title: "Làng cổ Đường Lâm - Về với cội nguồn",
      content: "Trải nghiệm cuộc sống làng quê yên bình tại làng cổ Đường Lâm...",
      likes: 156,
      createdAt: "2025-02-28",
      updatedAt: "2025-02-28",
      status: true,
      author: {
        id: 5,
        name: "Phạm Văn E",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      place: {
        id: 5,
        name: "Làng cổ Đường Lâm",
        address: "Hà Nội, Việt Nam",
        averageStar: 4.5,
      },
      category: {
        name: "Làng quê",
        slug: "countryside",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
  ]

  // Mock data for popular categories
  const popularCategories = [
    { name: "Biển", slug: "beach", count: 120, color: "beach" },
    { name: "Núi", slug: "mountain", count: 85, color: "mountain" },
    { name: "Thành phố", slug: "city", count: 150, color: "city" },
    { name: "Đảo", slug: "island", count: 65, color: "island" },
    { name: "Làng quê", slug: "countryside", count: 40, color: "countryside" },
  ]

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
            {popularCategories.map((category) => (
              <CategoryHighlight key={category.slug} category={category} />
            ))}
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
            {featuredPosts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
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
            {featuredPosts.slice(3, 5).map((post) => (
              <PostCard key={post.id} post={post} layout="horizontal" />
            ))}
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
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <Link href="/auth/register">Đăng ký tài khoản</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

