import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { PostCard } from "@/components/post-card"
import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Navigation,
  Clock,
  Users,
  Camera,
  ThumbsUp,
  MessageSquare,
  Share2,
  ChevronLeft,
  Sun,
} from "lucide-react"
import { PlaceReviewForm } from "@/components/place-review-form"

interface PlacePageProps {
  params: {
    id: string
  }
}

export default function PlacePage({ params }: PlacePageProps) {
  const { id } = params

  // Mock place data
  const place = {
    id: Number.parseInt(id),
    name: "Vịnh Hạ Long",
    description:
      "Vịnh Hạ Long là một trong những kỳ quan thiên nhiên tuyệt đẹp của Việt Nam, được UNESCO công nhận là Di sản Thiên nhiên Thế giới. Với hơn 1.600 hòn đảo đá vôi lớn nhỏ, Vịnh Hạ Long tạo nên một bức tranh thiên nhiên hùng vĩ và độc đáo.",
    address: "Quảng Ninh, Việt Nam",
    province: "Quảng Ninh",
    averageStar: 4.8,
    reviewCount: 245,
    visitCount: 1250,
    category: {
      name: "Biển",
      slug: "beach",
    },
    openHours: "06:00 - 18:00",
    bestTimeToVisit: "Tháng 10 - Tháng 4",
    entranceFee: "200.000 - 500.000 VNĐ",
    coordinates: {
      lat: 20.9100512,
      lng: 107.1839024,
    },
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    amenities: ["Bãi đỗ xe", "Nhà hàng", "Khách sạn", "Dịch vụ hướng dẫn", "Dịch vụ thuyền", "Wifi"],
  }

  // Mock posts about this place
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
      title: "Ngắm hoàng hôn tuyệt đẹp tại Vịnh Hạ Long",
      content: "Hoàng hôn trên Vịnh Hạ Long là một trong những khoảnh khắc đẹp nhất mà bạn có thể trải nghiệm...",
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
      id: 3,
      title: "Trải nghiệm thuyền kayak tại Vịnh Hạ Long",
      content: "Chèo thuyền kayak là một trong những hoạt động thú vị nhất khi đến Vịnh Hạ Long...",
      likes: 156,
      createdAt: "2025-03-05",
      updatedAt: "2025-03-05",
      status: true,
      author: {
        id: 3,
        name: "Lê Văn C",
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
  ]

  // Mock reviews
  const reviews = [
    {
      id: 1,
      rating: 5,
      content:
        "Vịnh Hạ Long thực sự là một kỳ quan thiên nhiên tuyệt vời! Tôi đã có cơ hội đến đó vào năm ngoái và trải nghiệm thật khó quên.",
      createdAt: "2025-03-16T10:30:00",
      author: {
        id: 2,
        name: "Trần Thị B",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: 2,
      rating: 4,
      content:
        "Phong cảnh tuyệt đẹp, nhưng hơi đông du khách vào mùa cao điểm. Nên đi vào tháng 11 hoặc tháng 3 để tránh đông đúc.",
      createdAt: "2025-03-10T09:45:00",
      author: {
        id: 3,
        name: "Lê Văn C",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
    },
  ]

  const getCategoryColor = (slug: string) => {
    const colors: Record<string, string> = {
      beach: "bg-blue-500",
      mountain: "bg-green-500",
      city: "bg-purple-500",
      island: "bg-yellow-500",
      countryside: "bg-amber-800",
    }
    return colors[slug] || "bg-primary"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4" asChild>
        <Link href="/places">
          <ChevronLeft className="h-4 w-4 mr-2" />
          <span>Quay lại</span>
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Place Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getCategoryColor(place.category.slug)} hover:opacity-90`}>
                {place.category.name}
              </Badge>
              <Badge variant="outline">{place.province}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={place.averageStar} />
              <span className="text-muted-foreground">({place.reviewCount} đánh giá)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{place.address}</span>
            </div>
          </div>

          {/* Place Images */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="col-span-4 md:col-span-2 row-span-2 relative h-80">
              <Image
                src={place.images[0] || "/placeholder.svg"}
                alt={place.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            {place.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-40">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${place.name} ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                {index === 3 && place.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <span className="text-white text-xl font-bold">+{place.images.length - 5}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Place Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Giới thiệu</h2>
            <p className="text-muted-foreground mb-6">{place.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Giờ mở cửa</h3>
                  <p className="text-sm text-muted-foreground">{place.openHours}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Thời điểm lý tưởng</h3>
                  <p className="text-sm text-muted-foreground">{place.bestTimeToVisit}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Ticket className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Giá vé</h3>
                  <p className="text-sm text-muted-foreground">{place.entranceFee}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Tiện ích</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {place.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Thống kê</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>{place.visitCount} lượt ghé thăm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    <span>{relatedPosts.length} bài viết</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    <span>{place.reviewCount} đánh giá</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Vị trí</h2>
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="font-medium">Bản đồ vị trí</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vị trí chính xác: {place.coordinates.lat}, {place.coordinates.lng}
                  </p>
                  <Button>Xem trên Google Maps</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Bài viết về {place.name}</h2>
              <Button variant="outline" asChild>
                <Link href={`/posts/create?place=${place.id}`}>
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
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Đánh giá từ cộng đồng</h2>

            <div className="mb-8">
              <PlaceReviewForm placeId={place.id} />
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.author.avatarPath} alt={review.author.name} />
                        <AvatarFallback>{review.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{review.author.name}</h3>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {new Date(review.createdAt).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p>{review.content}</p>
                        <div className="flex gap-4 mt-4">
                          <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Hữu ích</span>
                          </button>
                          <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>Bình luận</span>
                          </button>
                          <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            <span>Chia sẻ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-20">
            <Card className="mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4">
                <h2 className="text-xl font-bold">Thông tin nhanh</h2>
              </div>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Địa chỉ</p>
                      <p className="text-sm text-muted-foreground">{place.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Giờ mở cửa</p>
                      <p className="text-sm text-muted-foreground">{place.openHours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Thời điểm lý tưởng</p>
                      <p className="text-sm text-muted-foreground">{place.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Giá vé</p>
                      <p className="text-sm text-muted-foreground">{place.entranceFee}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <Button className="w-full">
                    <Navigation className="h-4 w-4 mr-2" />
                    Chỉ đường
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4">Địa điểm lân cận</h2>
                <div className="space-y-3">
                  <Link href="/places/2" className="flex items-start gap-3 group">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Hang Sửng Sốt"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">Hang Sửng Sốt</h3>
                      <p className="text-sm text-muted-foreground">Cách 2.5 km</p>
                      <StarRating rating={4.7} size="sm" />
                    </div>
                  </Link>
                  <Link href="/places/3" className="flex items-start gap-3 group">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Đảo Ti Tốp"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">Đảo Ti Tốp</h3>
                      <p className="text-sm text-muted-foreground">Cách 3.8 km</p>
                      <StarRating rating={4.5} size="sm" />
                    </div>
                  </Link>
                  <Link href="/places/4" className="flex items-start gap-3 group">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Hang Luồn"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">Hang Luồn</h3>
                      <p className="text-sm text-muted-foreground">Cách 5.2 km</p>
                      <StarRating rating={4.6} size="sm" />
                    </div>
                  </Link>
                </div>
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <Link href="/places">Xem thêm</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4">Thời tiết</h2>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Sun className="h-12 w-12 text-yellow-500" />
                  </div>
                  <p className="text-3xl font-bold mb-1">27°C</p>
                  <p className="text-muted-foreground">Quảng Ninh, Việt Nam</p>
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
  )
}

// Componentes adicionales necesarios
function Avatar({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative rounded-full overflow-hidden ${className || ""}`}>{children}</div>
}

function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return <Image src={src || "/placeholder.svg"} alt={alt} width={40} height={40} className="object-cover" />
}

function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center bg-muted h-full w-full">{children}</div>
}

function Calendar(props: any) {
  return <Clock {...props} />
}

function Ticket(props: any) {
  return <div {...props}>🎫</div>
}

