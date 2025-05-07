import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Search } from "lucide-react"

export default function ProvincesPage() {
  // Mock provinces data
  const provinces = [
    {
      id: 1,
      name: "Hà Nội",
      slug: "ha-noi",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 120,
      region: "Miền Bắc",
      description: "Thủ đô ngàn năm văn hiến với nhiều di tích lịch sử và văn hóa đặc sắc.",
      popular: true,
    },
    {
      id: 2,
      name: "TP. Hồ Chí Minh",
      slug: "ho-chi-minh",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 150,
      region: "Miền Nam",
      description: "Thành phố năng động nhất cả nước với nhiều điểm tham quan hiện đại và truyền thống.",
      popular: true,
    },
    {
      id: 3,
      name: "Đà Nẵng",
      slug: "da-nang",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 85,
      region: "Miền Trung",
      description: "Thành phố biển xinh đẹp với cầu Rồng và bãi biển Mỹ Khê nổi tiếng.",
      popular: true,
    },
    {
      id: 4,
      name: "Quảng Ninh",
      slug: "quang-ninh",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 75,
      region: "Miền Bắc",
      description: "Nổi tiếng với Vịnh Hạ Long - một trong những kỳ quan thiên nhiên thế giới.",
      popular: true,
    },
    {
      id: 5,
      name: "Lào Cai",
      slug: "lao-cai",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 60,
      region: "Miền Bắc",
      description: "Nơi có Sapa với những thửa ruộng bậc thang tuyệt đẹp và đỉnh Fansipan hùng vĩ.",
      popular: true,
    },
    {
      id: 6,
      name: "Thừa Thiên Huế",
      slug: "thua-thien-hue",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 70,
      region: "Miền Trung",
      description: "Cố đô với hệ thống di tích lịch sử và văn hóa phong phú.",
      popular: true,
    },
    {
      id: 7,
      name: "Khánh Hòa",
      slug: "khanh-hoa",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 65,
      region: "Miền Trung",
      description: "Nổi tiếng với vịnh Nha Trang xinh đẹp và nhiều hòn đảo hoang sơ.",
      popular: true,
    },
    {
      id: 8,
      name: "Kiên Giang",
      slug: "kien-giang",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 55,
      region: "Miền Nam",
      description: "Nơi có đảo Phú Quốc với những bãi biển cát trắng tuyệt đẹp.",
      popular: true,
    },
    {
      id: 9,
      name: "Lâm Đồng",
      slug: "lam-dong",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 80,
      region: "Tây Nguyên",
      description: "Thành phố Đà Lạt mộng mơ với khí hậu mát mẻ quanh năm.",
      popular: true,
    },
    {
      id: 10,
      name: "Quảng Nam",
      slug: "quang-nam",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 60,
      region: "Miền Trung",
      description: "Nơi có phố cổ Hội An và khu di tích Mỹ Sơn nổi tiếng.",
      popular: true,
    },
    {
      id: 11,
      name: "Ninh Bình",
      slug: "ninh-binh",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 45,
      region: "Miền Bắc",
      description: "Vùng đất cố đô Hoa Lư với phong cảnh Tràng An, Tam Cốc tuyệt đẹp.",
      popular: false,
    },
    {
      id: 12,
      name: "Bình Thuận",
      slug: "binh-thuan",
      image: "/placeholder.svg?height=300&width=400",
      placeCount: 40,
      region: "Miền Trung",
      description: "Nổi tiếng với Mũi Né và những đồi cát trắng, đồi cát vàng độc đáo.",
      popular: false,
    },
  ]

  // Group provinces by region
  const regions = provinces.reduce(
    (acc, province) => {
      if (!acc[province.region]) {
        acc[province.region] = []
      }
      acc[province.region].push(province)
      return acc
    },
    {} as Record<string, typeof provinces>,
  )

  // Sort regions by name
  const sortedRegions = Object.keys(regions).sort()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Khám phá 63 tỉnh thành Việt Nam</h1>
        <p className="max-w-2xl mb-6">
          Tìm hiểu về các địa điểm du lịch nổi tiếng tại mỗi tỉnh thành. Từ những thành phố nhộn nhịp đến những vùng quê
          yên bình.
        </p>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm tỉnh thành..."
            className="pl-9 bg-white/20 border-white/30 placeholder:text-white/70 text-white"
          />
        </div>
      </div>

      {/* Popular Provinces */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Tỉnh thành nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {provinces
            .filter((p) => p.popular)
            .slice(0, 4)
            .map((province) => (
              <Link key={province.id} href={`/provinces/${province.slug}`} className="block group">
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={province.image || "/placeholder.svg"}
                      alt={province.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{province.name}</h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{province.placeCount} địa điểm</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground line-clamp-2">{province.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>

      {/* Provinces by Region */}
      {sortedRegions.map((region) => (
        <section key={region} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{region}</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href={`/regions/${region.toLowerCase().replace(" ", "-")}`}>Xem tất cả</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regions[region].map((province) => (
              <Link key={province.id} href={`/provinces/${province.slug}`} className="block group">
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-32">
                    <Image
                      src={province.image || "/placeholder.svg"}
                      alt={province.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-lg font-bold text-white">{province.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{province.placeCount} địa điểm</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

