import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { StarRating } from "@/components/star-rating"
import { MapPin, TrendingUp, Clock, Award, Compass, Users } from "lucide-react"

export default function ExplorePage() {
  // Mock trending places
  const trendingPlaces = [
    {
      id: 1,
      name: "Vịnh Hạ Long",
      province: "Quảng Ninh",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviewCount: 245,
      category: "beach",
    },
    {
      id: 2,
      name: "Phố cổ Hội An",
      province: "Quảng Nam",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviewCount: 320,
      category: "city",
    },
    {
      id: 3,
      name: "Sapa",
      province: "Lào Cai",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviewCount: 189,
      category: "mountain",
    },
    {
      id: 4,
      name: "Phú Quốc",
      province: "Kiên Giang",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviewCount: 278,
      category: "island",
    },
  ]

  // Mock trending posts
  const trendingPosts = [
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
  ]

  // Mock recent places
  const recentPlaces = [
    {
      id: 5,
      name: "Đảo Lý Sơn",
      province: "Quảng Ngãi",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      reviewCount: 120,
      category: "island",
    },
    {
      id: 6,
      name: "Thác Bản Giốc",
      province: "Cao Bằng",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviewCount: 95,
      category: "mountain",
    },
    {
      id: 7,
      name: "Phong Nha - Kẻ Bàng",
      province: "Quảng Bình",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviewCount: 210,
      category: "mountain",
    },
    {
      id: 8,
      name: "Cần Thơ",
      province: "Cần Thơ",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.4,
      reviewCount: 150,
      category: "countryside",
    },
  ]

  // Mock popular activities
  const popularActivities = [
    {
      id: 1,
      name: "Chèo thuyền kayak",
      image: "/placeholder.svg?height=300&width=400",
      count: 120,
    },
    {
      id: 2,
      name: "Leo núi",
      image: "/placeholder.svg?height=300&width=400",
      count: 85,
    },
    {
      id: 3,
      name: "Lặn biển",
      image: "/placeholder.svg?height=300&width=400",
      count: 95,
    },
    {
      id: 4,
      name: "Cắm trại",
      image: "/placeholder.svg?height=300&width=400",
      count: 110,
    },
  ]

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      beach: "from-blue-500 to-blue-700",
      mountain: "from-green-500 to-green-700",
      city: "from-purple-500 to-purple-700",
      island: "from-yellow-500 to-yellow-700",
      countryside: "from-amber-700 to-amber-900",
    }
    return gradients[category] || "from-primary to-primary-dark"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Khám phá Việt Nam</h1>
        <p className="max-w-2xl mb-6">
          Tìm kiếm những địa điểm du lịch thú vị, hoạt động hấp dẫn và trải nghiệm độc đáo trên khắp Việt Nam.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link href="/places">
              <MapPin className="mr-2 h-5 w-5" />
              Địa điểm
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
            <Link href="/provinces">
              <Compass className="mr-2 h-5 w-5" />
              Tỉnh thành
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trending" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Xu hướng</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mới nhất</span>
          </TabsTrigger>
          <TabsTrigger value="top-rated" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Đánh giá cao</span>
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Phổ biến</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Địa điểm nổi bật</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trendingPlaces.map((place) => (
                  <Link key={place.id} href={`/places/${place.id}`} className="block group">
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-2 right-2">
                          <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            Trending
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white">{place.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-white/80 text-sm">{place.province}</span>
                            <StarRating rating={place.rating} size="sm" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/places">Xem thêm địa điểm</Link>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Bài viết nổi bật</h2>
              <div className="space-y-4">
                {trendingPosts.map((post) => (
                  <PostCard key={post.id} post={post} layout="horizontal" />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/posts">Xem thêm bài viết</Link>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Địa điểm mới</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentPlaces.map((place) => (
                  <Link key={place.id} href={`/places/${place.id}`} className="block group">
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-2 right-2">
                          <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            Mới
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white">{place.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-white/80 text-sm">{place.province}</span>
                            <StarRating rating={place.rating} size="sm" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Hoạt động phổ biến</h2>
              <div className="grid grid-cols-2 gap-4">
                {popularActivities.map((activity) => (
                  <Link key={activity.id} href={`/activities/${activity.id}`} className="block group">
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white">{activity.name}</h3>
                          <div className="flex items-center">
                            <span className="text-white/80 text-sm">{activity.count} địa điểm</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="top-rated">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...trendingPlaces, ...recentPlaces]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 6)
              .map((place) => (
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
                      <div className="absolute top-2 right-2">
                        <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          Top Rated
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white">{place.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">{place.province}</span>
                          <div className="flex items-center">
                            <StarRating rating={place.rating} size="sm" />
                            <span className="text-white/80 text-xs ml-1">({place.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{place.province}</span>
                        </div>
                        <div className="bg-gradient-to-r text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                          <span>{place.rating}</span>
                          <span className="text-yellow-300">★</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="popular">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...trendingPlaces, ...recentPlaces]
              .sort((a, b) => b.reviewCount - a.reviewCount)
              .slice(0, 6)
              .map((place) => (
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
                      <div className="absolute top-2 right-2">
                        <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          Popular
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white">{place.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">{place.province}</span>
                          <div className="flex items-center">
                            <StarRating rating={place.rating} size="sm" />
                            <span className="text-white/80 text-xs ml-1">({place.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{place.province}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{place.reviewCount} đánh giá</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Destinations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Điểm đến nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["beach", "mountain", "city"].map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`bg-gradient-to-r ${getCategoryGradient(category)} text-white p-6`}>
                <h3 className="text-xl font-bold mb-2">
                  {category === "beach" ? "Biển đảo" : category === "mountain" ? "Núi rừng" : "Thành phố"}
                </h3>
                <p className="mb-4 text-white/90">
                  {category === "beach"
                    ? "Khám phá những bãi biển tuyệt đẹp với cát trắng, nước xanh và nhiều hoạt động thú vị."
                    : category === "mountain"
                      ? "Chinh phục những đỉnh núi hùng vĩ, khám phá hang động và trải nghiệm không khí trong lành."
                      : "Khám phá nhịp sống sôi động, văn hóa đa dạng và ẩm thực phong phú tại các thành phố."}
                </p>
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
                  <Link href={`/categories/${category}`}>Khám phá</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Travel Inspiration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Cảm hứng du lịch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=300&width=400" alt="Du lịch gia đình" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-3 left-3">
                <h3 className="text-lg font-bold text-white">Du lịch gia đình</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-muted-foreground">
                Những điểm đến lý tưởng cho chuyến đi cùng gia đình với nhiều hoạt động phù hợp cho mọi lứa tuổi.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=300&width=400" alt="Du lịch mạo hiểm" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-3 left-3">
                <h3 className="text-lg font-bold text-white">Du lịch mạo hiểm</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-muted-foreground">
                Những trải nghiệm đầy thử thách và cảm giác mạnh cho những người yêu thích sự phiêu lưu.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=300&width=400" alt="Du lịch văn hóa" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-3 left-3">
                <h3 className="text-lg font-bold text-white">Du lịch văn hóa</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-muted-foreground">
                Khám phá nét văn hóa độc đáo, di sản lịch sử và phong tục tập quán của các vùng miền.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image src="/placeholder.svg?height=300&width=400" alt="Du lịch ẩm thực" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-3 left-3">
                <h3 className="text-lg font-bold text-white">Du lịch ẩm thực</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-muted-foreground">
                Trải nghiệm những món ăn đặc sản, hương vị độc đáo và văn hóa ẩm thực đa dạng của từng vùng miền.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

