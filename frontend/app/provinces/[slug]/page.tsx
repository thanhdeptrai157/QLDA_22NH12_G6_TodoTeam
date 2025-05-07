import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { StarRating } from "@/components/star-rating"
import { MapPin, Camera, Landmark, Hotel, Utensils, Calendar, ChevronLeft } from "lucide-react"

interface ProvincePageProps {
  params: {
    slug: string
  }
}

export default function ProvincePage({ params }: ProvincePageProps) {
  const { slug } = params

  // Mock province data
  const province = {
    id: 1,
    name: "Quảng Ninh",
    slug: "quang-ninh",
    description:
      "Quảng Ninh là một tỉnh ven biển thuộc vùng Đông Bắc Bộ Việt Nam. Nơi đây nổi tiếng với Vịnh Hạ Long - một trong những kỳ quan thiên nhiên thế giới, cùng nhiều danh lam thắng cảnh và di tích lịch sử văn hóa khác.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=600&width=1600",
    region: "Miền Bắc",
    population: "1.320.324",
    area: "6.102 km²",
    capital: "Hạ Long",
    yearFounded: "1963",
    climate: "Nhiệt đới gió mùa, có 4 mùa rõ rệt",
    bestTimeToVisit: "Tháng 10 - Tháng 4",
    famousFor: ["Vịnh Hạ Long", "Đảo Cô Tô", "Vân Đồn", "Chùa Cái Bầu", "Bãi biển Trà Cổ"],
    specialties: ["Chả mực Hạ Long", "Sá sùng", "Ngán", "Hàu nướng", "Sam biển"],
    festivals: [
      {
        name: "Lễ hội Yên Tử",
        time: "Tháng 1-3 Âm lịch",
        description: "Lễ hội truyền thống tại chùa Yên Tử",
      },
      {
        name: "Lễ hội Cửa Ông",
        time: "Tháng 2-3 Âm lịch",
        description: "Lễ hội tưởng nhớ Trần Quốc Tuấn",
      },
      {
        name: "Carnaval Hạ Long",
        time: "Tháng 4-5 Dương lịch",
        description: "Lễ hội đường phố với nhiều hoạt động văn hóa, nghệ thuật",
      },
    ],
  }

  // Mock top places in this province
  const topPlaces = [
    {
      id: 1,
      name: "Vịnh Hạ Long",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviewCount: 245,
      description: "Vịnh Hạ Long là một trong những kỳ quan thiên nhiên thế giới với hơn 1.600 hòn đảo đá vôi.",
      category: "beach",
    },
    {
      id: 2,
      name: "Đảo Cô Tô",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviewCount: 189,
      description:
        "Đảo Cô Tô nổi tiếng với những bãi biển cát trắng mịn, nước biển trong xanh và không khí trong lành.",
      category: "island",
    },
    {
      id: 3,
      name: "Chùa Yên Tử",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviewCount: 156,
      description: "Chùa Yên Tử là một quần thể di tích lịch sử văn hóa và danh thắng nổi tiếng tại Việt Nam.",
      category: "mountain",
    },
    {
      id: 4,
      name: "Bãi biển Trà Cổ",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      reviewCount: 120,
      description: "Bãi biển Trà Cổ là một trong những bãi biển dài nhất Việt Nam với bờ cát trắng mịn.",
      category: "beach",
    },
  ]

  // Mock posts about this province
  const relatedPosts = [
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
      title: "Đảo Cô Tô - Thiên đường biển đảo phía Bắc",
      content: "Khám phá bãi biển cát trắng mịn và nước biển trong xanh tại Cô Tô...",
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
        name: "Đảo Cô Tô",
        address: "Quảng Ninh, Việt Nam",
        averageStar: 4.7,
      },
      category: {
        name: "Đảo",
        slug: "island",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
  ]

  // Mock hotels
  const hotels = [
    {
      id: 1,
      name: "Vinpearl Resort & Spa Hạ Long",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      price: "2.500.000 VNĐ/đêm",
      location: "Hạ Long, Quảng Ninh",
    },
    {
      id: 2,
      name: "FLC Grand Hotel Hạ Long",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      price: "1.800.000 VNĐ/đêm",
      location: "Hạ Long, Quảng Ninh",
    },
    {
      id: 3,
      name: "Cô Tô Beach Resort",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      price: "1.200.000 VNĐ/đêm",
      location: "Đảo Cô Tô, Quảng Ninh",
    },
  ]

  // Mock restaurants
  const restaurants = [
    {
      id: 1,
      name: "Nhà hàng Hải Sản Hạ Long",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      priceRange: "200.000 - 500.000 VNĐ",
      location: "Hạ Long, Quảng Ninh",
      specialty: "Hải sản tươi sống",
    },
    {
      id: 2,
      name: "Nhà hàng Cô Tô Express",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      priceRange: "150.000 - 400.000 VNĐ",
      location: "Đảo Cô Tô, Quảng Ninh",
      specialty: "Hải sản đặc sản Cô Tô",
    },
    {
      id: 3,
      name: "Quán Ngon Quảng Ninh",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      priceRange: "100.000 - 300.000 VNĐ",
      location: "Hạ Long, Quảng Ninh",
      specialty: "Đặc sản địa phương",
    },
  ]

  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image src={province.coverImage || "/placeholder.svg"} alt={province.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Button variant="ghost" className="mb-4 text-white" asChild>
              <Link href="/provinces">
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Quay lại</span>
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{province.name}</h1>
            <div className="flex items-center text-white/80">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{province.region}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Province Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Giới thiệu</h2>
              <p className="text-muted-foreground mb-6">{province.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <MapPin className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Diện tích</h3>
                    <p className="text-sm text-muted-foreground">{province.area}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Dân số</h3>
                    <p className="text-sm text-muted-foreground">{province.population}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Landmark className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Thành phố</h3>
                    <p className="text-sm text-muted-foreground">{province.capital}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Thành lập</h3>
                    <p className="text-sm text-muted-foreground">{province.yearFounded}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Top Places */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Địa điểm nổi bật</h2>
                <Button variant="outline" asChild>
                  <Link href={`/places?province=${slug}`}>
                    <span>Xem tất cả</span>
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topPlaces.map((place) => (
                  <Link key={place.id} href={`/places/${place.id}`} className="block group">
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white">{place.name}</h3>
                          <div className="flex items-center justify-between">
                            <StarRating rating={place.rating} size="sm" />
                            <span className="text-white/80 text-sm">{place.reviewCount} đánh giá</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-muted-foreground line-clamp-2">{place.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Bài viết về {province.name}</h2>
                <Button variant="outline" asChild>
                  <Link href={`/posts/create?province=${province.id}`}>
                    <Camera className="h-4 w-4 mr-2" />
                    Chia sẻ trải nghiệm
                  </Link>
                </Button>
              </div>
              <div className="space-y-6">
                {relatedPosts.map((post) => (
                  <PostCard key={post.id} post={post} layout="horizontal" />
                ))}
              </div>
              {relatedPosts.length > 0 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href={`/posts?province=${slug}`}>Xem thêm bài viết</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Accommodations and Food */}
            <Tabs defaultValue="hotels" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="hotels" className="flex items-center gap-2">
                  <Hotel className="h-4 w-4" />
                  <span>Khách sạn</span>
                </TabsTrigger>
                <TabsTrigger value="restaurants" className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  <span>Nhà hàng</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hotels">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hotels.map((hotel) => (
                    <Card key={hotel.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-1">{hotel.name}</h3>
                        <div className="flex items-center mb-2">
                          <StarRating rating={hotel.rating} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{hotel.location}</p>
                        <p className="text-sm font-medium">{hotel.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="restaurants">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {restaurants.map((restaurant) => (
                    <Card key={restaurant.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <Image
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-1">{restaurant.name}</h3>
                        <div className="flex items-center mb-2">
                          <StarRating rating={restaurant.rating} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{restaurant.location}</p>
                        <p className="text-sm text-muted-foreground mb-2">{restaurant.priceRange}</p>
                        <p className="text-sm font-medium">Đặc sản: {restaurant.specialty}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-20">
              {/* Quick Info */}
              <Card className="mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4">
                  <h2 className="text-xl font-bold">Thông tin nhanh</h2>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Khí hậu</h3>
                      <p className="text-sm text-muted-foreground">{province.climate}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Thời điểm lý tưởng</h3>
                      <p className="text-sm text-muted-foreground">{province.bestTimeToVisit}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Nổi tiếng với</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {province.famousFor.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">Đặc sản</h2>
                  <ul className="space-y-2">
                    {province.specialties.map((specialty, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Festivals */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">Lễ hội</h2>
                  <div className="space-y-4">
                    {province.festivals.map((festival, index) => (
                      <div key={index}>
                        <h3 className="font-medium">{festival.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">Thời gian: {festival.time}</p>
                        <p className="text-sm">{festival.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weather */}
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">Thời tiết</h2>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Sun className="h-12 w-12 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold mb-1">27°C</p>
                    <p className="text-muted-foreground">{province.name}, Việt Nam</p>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Độ ẩm</p>
                        <p className="font-medium">75%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Gió</p>
                        <p className="font-medium">15 km/h</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">UV</p>
                        <p className="font-medium">Cao</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componentes adicionales necesarios
function Users(props: any) {
  return <div {...props}>👥</div>
}

function Sun(props: any) {
  return <div {...props}>☀️</div>
}

