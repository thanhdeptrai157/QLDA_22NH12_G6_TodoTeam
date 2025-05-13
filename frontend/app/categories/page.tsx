import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { MapPin, Compass, Mountain, Building, TreePalmIcon as PalmTree, Home } from "lucide-react"

const getCategoryGradientClass = (color: string) => {
  const colors: Record<string, string> = {
    beach: "from-blue-500 to-blue-700",
    mountain: "from-green-500 to-green-700",
    city: "from-purple-500 to-purple-700",
    island: "from-yellow-500 to-yellow-700",
    countryside: "from-amber-700 to-amber-900",
  }
  return colors[color] || "from-primary to-primary-dark"
}

const getCategoryTextClass = (color: string) => {
  const colors: Record<string, string> = {
    beach: "text-blue-500",
    mountain: "text-green-500",
    city: "text-purple-500",
    island: "text-yellow-500",
    countryside: "text-amber-800",
  }
  return colors[color] || "text-primary"
}

const getCategoryBorderClass = (color: string) => {
  const colors: Record<string, string> = {
    beach: "border-blue-200 hover:border-blue-500",
    mountain: "border-green-200 hover:border-green-500",
    city: "border-purple-200 hover:border-purple-500",
    island: "border-yellow-200 hover:border-yellow-500",
    countryside: "border-amber-200 hover:border-amber-800",
  }
  return colors[color] || "border-primary/20 hover:border-primary"
}

export default function CategoriesPage() {
  // Mock data for categories
  const categories = [
    {
      name: "Biển",
      slug: "beach",
      count: 120,
      color: "beach",
      description: "Khám phá những bãi biển tuyệt đẹp với cát trắng, nước xanh và nhiều hoạt động thú vị.",
      icon: <PalmTree className="h-8 w-8" />,
      featuredPlaces: ["Vịnh Hạ Long", "Nha Trang", "Phú Quốc", "Đà Nẵng", "Mũi Né"],
    },
    {
      name: "Núi",
      slug: "mountain",
      count: 85,
      color: "mountain",
      description: "Chinh phục những đỉnh núi hùng vĩ, khám phá hang động và trải nghiệm không khí trong lành.",
      icon: <Mountain className="h-8 w-8" />,
      featuredPlaces: ["Sapa", "Fansipan", "Mộc Châu", "Đà Lạt", "Tam Đảo"],
    },
    {
      name: "Thành phố",
      slug: "city",
      count: 150,
      color: "city",
      description: "Khám phá nhịp sống sôi động, văn hóa đa dạng và ẩm thực phong phú tại các thành phố.",
      icon: <Building className="h-8 w-8" />,
      featuredPlaces: ["Hà Nội", "TP. Hồ Chí Minh", "Huế", "Hội An", "Đà Nẵng"],
    },
    {
      name: "Đảo",
      slug: "island",
      count: 65,
      color: "island",
      description: "Khám phá những hòn đảo thiên đường với bãi biển hoang sơ và hệ sinh thái đa dạng.",
      icon: <Compass className="h-8 w-8" />,
      featuredPlaces: ["Phú Quốc", "Côn Đảo", "Cát Bà", "Lý Sơn", "Nam Du"],
    },
    {
      name: "Làng quê",
      slug: "countryside",
      count: 40,
      color: "countryside",
      description: "Trải nghiệm cuộc sống yên bình, văn hóa truyền thống và ẩm thực đặc sắc tại làng quê Việt Nam.",
      icon: <Home className="h-8 w-8" />,
      featuredPlaces: [
        "Làng cổ Đường Lâm",
        "Làng gốm Bát Tràng",
        "Làng nổi Tân Lập",
        "Làng hoa Sa Đéc",
        "Làng lụa Vạn Phúc",
      ],
    },
  ]

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
        {categories.map((category) => (
          <Card
            key={category.slug}
            className={`overflow-hidden ${getCategoryBorderClass(category.color)} transition-all hover-scale`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div
                className={`bg-gradient-to-r ${getCategoryGradientClass(category.color)} text-white p-6 flex flex-col justify-between`}
              >
                <div>
                  <div className="mb-4">{category.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="mb-4 text-white/90">{category.description}</p>
                  <p className="text-sm text-white/80">{category.count} bài viết</p>
                </div>
                <Button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm w-full md:w-auto" asChild>
                  <Link href={`/categories/${category.slug}`}>Khám phá</Link>
                </Button>
              </div>
              <div className="col-span-2 p-6">
                <h3 className="text-lg font-medium mb-4">Địa điểm nổi bật</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.featuredPlaces.map((place, index) => (
                    <Link
                      key={index}
                      href={`/search/advanced/?address=${encodeURIComponent(place)}&category=${category.slug}`}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <MapPin className={getCategoryTextClass(category.color)} />
                      <span>{place}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

