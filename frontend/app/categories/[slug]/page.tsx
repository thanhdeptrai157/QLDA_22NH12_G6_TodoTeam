import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { MapPin } from "lucide-react"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Cambiar la forma en que aplicamos las clases de color de categoría
const getCategoryBgClass = (slug: string) => {
  const colors: Record<string, string> = {
    beach: "bg-blue-500",
    mountain: "bg-green-500",
    city: "bg-purple-500",
    island: "bg-yellow-500",
    countryside: "bg-amber-800",
  }
  return colors[slug] || "bg-primary"
}

const getCategoryHoverClass = (slug: string) => {
  const colors: Record<string, string> = {
    beach: "hover:bg-blue-100",
    mountain: "hover:bg-green-100",
    city: "hover:bg-purple-100",
    island: "hover:bg-yellow-100",
    countryside: "hover:bg-amber-100",
  }
  return colors[slug] || "hover:bg-primary/10"
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  // Mock data for categories
  const categories = [
    { name: "Biển", slug: "beach", count: 120, color: "beach" },
    { name: "Núi", slug: "mountain", count: 85, color: "mountain" },
    { name: "Thành phố", slug: "city", count: 150, color: "city" },
    { name: "Đảo", slug: "island", count: 65, color: "island" },
    { name: "Làng quê", slug: "countryside", count: 40, color: "countryside" },
  ]

  // Find current category
  const currentCategory = categories.find((cat) => cat.slug === slug) || {
    name: "Không tìm thấy",
    slug: "not-found",
    count: 0,
    color: "primary",
  }

  // Mock data for posts in this category
  const categoryPosts = [
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
      title: "Bãi biển Mỹ Khê - Thiên đường nghỉ dưỡng",
      content: "Bãi biển Mỹ Khê được tạp chí Forbes bình chọn là một trong những bãi biển quyến rũ nhất hành tinh...",
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
        name: "Bãi biển Mỹ Khê",
        address: "Đà Nẵng, Việt Nam",
        averageStar: 4.6,
      },
      category: {
        name: "Biển",
        slug: "beach",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
    {
      id: 3,
      title: "Bãi Sao Phú Quốc - Cát trắng nước xanh",
      content:
        "Bãi Sao được mệnh danh là một trong những bãi biển đẹp nhất Việt Nam với bờ cát trắng mịn và làn nước trong xanh...",
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
        name: "Bãi Sao",
        address: "Phú Quốc, Kiên Giang, Việt Nam",
        averageStar: 4.9,
      },
      category: {
        name: "Biển",
        slug: "beach",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
    {
      id: 4,
      title: "Biển Nha Trang - Thiên đường du lịch",
      content: "Nha Trang nổi tiếng với bãi biển dài, cát trắng mịn và nhiều hoạt động giải trí hấp dẫn...",
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
        name: "Biển Nha Trang",
        address: "Nha Trang, Khánh Hòa, Việt Nam",
        averageStar: 4.7,
      },
      category: {
        name: "Biển",
        slug: "beach",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
  ]

  // Filter posts based on category
  const filteredPosts = categoryPosts.filter((post) => post.category.slug === slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`${getCategoryBgClass(currentCategory.slug)} text-white rounded-xl p-8 mb-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center`}>
            <MapPin className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{currentCategory.name}</h1>
            <p className="text-white/80">{currentCategory.count} bài viết</p>
          </div>
        </div>
        <p className="max-w-2xl">
          Khám phá những trải nghiệm tuyệt vời tại các địa điểm {currentCategory.name.toLowerCase()} nổi tiếng. Chia sẻ
          và tìm kiếm những góc nhìn mới về những điểm đến hấp dẫn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 order-2 md:order-1">
          <div className="sticky top-20">
            <h2 className="text-xl font-bold mb-4">Danh mục</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className={`block p-3 rounded-lg transition-colors ${
                    category.slug === slug
                      ? getCategoryBgClass(category.slug) + " text-white"
                      : getCategoryHoverClass(category.slug)
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className={`text-sm ${category.slug === slug ? "text-white/80" : "text-muted-foreground"}`}>
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

          {filteredPosts.length > 0 ? (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
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

