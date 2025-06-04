"use client";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { MapPin } from "lucide-react"
import { useCategoryWithDetails } from "@/hooks/useCategory"

// Tạo mảng màu gradient random
const gradientColors = [
  "from-blue-500 to-blue-700",
  "from-green-500 to-green-700", 
  "from-purple-500 to-purple-700",
  "from-red-500 to-red-700",
  "from-yellow-500 to-yellow-700",
  "from-pink-500 to-pink-700",
  "from-indigo-500 to-indigo-700",
  "from-orange-500 to-orange-700",
  "from-teal-500 to-teal-700",
  "from-cyan-500 to-cyan-700"
]

// Tạo màu border tương ứng
const borderColors = [
  "border-blue-200 hover:border-blue-500",
  "border-green-200 hover:border-green-500",
  "border-purple-200 hover:border-purple-500", 
  "border-red-200 hover:border-red-500",
  "border-yellow-200 hover:border-yellow-500",
  "border-pink-200 hover:border-pink-500",
  "border-indigo-200 hover:border-indigo-500",
  "border-orange-200 hover:border-orange-500",
  "border-teal-200 hover:border-teal-500",
  "border-cyan-200 hover:border-cyan-500"
]

// Tạo màu text tương ứng
const textColors = [
  "text-blue-500",
  "text-green-500",
  "text-purple-500",
  "text-red-500", 
  "text-yellow-500",
  "text-pink-500",
  "text-indigo-500",
  "text-orange-500",
  "text-teal-500",
  "text-cyan-500"
]

// Function để lấy màu random dựa trên ID
const getRandomColorByIndex = (index: number) => {
  return {
    gradient: gradientColors[index % gradientColors.length],
    border: borderColors[index % borderColors.length], 
    text: textColors[index % textColors.length]
  }
}

export default function CategoriesPage() {
  const { categories, isLoading: isCategoryLoading } = useCategoryWithDetails()

  if (isCategoryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-xl mb-8"></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 rounded-xl mb-4"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Danh mục du lịch</h1>
        <p className="max-w-2xl mb-6">
          Khám phá các địa điểm du lịch theo danh mục. Từ những bãi biển tuyệt đẹp, núi non hùng vĩ đến các thành phố
          sôi động và làng quê yên bình.
        </p>
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {categories.map((category, index) => {
          const colors = getRandomColorByIndex(index)
          
          return (
            <Card
              key={category.id}
              className={`overflow-hidden ${colors.border} transition-all hover-scale`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div
                  className={`bg-gradient-to-r ${colors.gradient} text-white p-6 flex flex-col justify-between`}
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                    <p className="mb-4 text-white/90">{category.description}</p>
                    <p className="text-sm text-white/80">{category.count} bài viết</p>
                  </div>
                  <Button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm w-full md:w-auto" asChild>
                    <Link href={`/categories/${category.id}`}>Khám phá</Link>
                  </Button>
                </div>
                <div className="col-span-2 p-6">
                  <h3 className="text-lg font-medium mb-4">Địa điểm nổi bật</h3>
                  {category.featuredPlaces && Array.isArray(category.featuredPlaces) &&  category.featuredPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.featuredPlaces.map((place: string, placeIndex: number) => (
                        <Link
                          key={placeIndex}
                          href={`/search/advanced/?address=${encodeURIComponent(place)}&category=${category.id}`}
                          className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <MapPin className={`h-4 w-4 ${colors.text}`} />
                          <span>{place}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Chưa có địa điểm nổi bật</p>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}