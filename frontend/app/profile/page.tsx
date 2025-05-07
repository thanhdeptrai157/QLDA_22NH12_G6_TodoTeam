"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Camera,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Edit,
  Settings,
  Users,
  BookOpen,
  ImageIcon,
  Bookmark,
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")

  // Mock user data
  const user = {
    id: 1,
    name: "Nguyễn Văn A",
    username: "nguyenvana",
    bio: "Yêu du lịch | Nhiếp ảnh gia | Foodie | Đã đến 20+ tỉnh thành Việt Nam",
    avatarPath: "/placeholder.svg?height=200&width=200",
    coverPath: "/placeholder.svg?height=400&width=1200",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    location: "Hà Nội, Việt Nam",
    joinDate: "Tháng 3, 2023",
    followers: 245,
    following: 123,
    posts: 36,
  }

  // Mock posts data
  const userPosts = [
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
        name: user.name,
        avatarPath: user.avatarPath,
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
        id: 1,
        name: user.name,
        avatarPath: user.avatarPath,
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

  // Mock saved posts
  const savedPosts = [
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
  ]

  // Mock photos
  const photos = [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
  ]

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      {/* Cover Photo */}
      <div className="relative h-[300px] md:h-[350px] lg:h-[400px] w-full">
        <Image src={user.coverPath || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button size="sm" variant="secondary" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm" asChild>
            <Link href="/profile/edit">
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa trang cá nhân
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-6 flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="relative">
            <Avatar className="h-36 w-36 border-4 border-background dark:border-background">
              <AvatarImage src={user.avatarPath} alt={user.name} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-primary text-white h-8 w-8"
              asChild
            >
              <Link href="/profile/edit">
                <Camera className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex-grow">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-2 max-w-xl">{user.bio}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Tham gia {user.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <Button asChild>
              <Link href="/profile/edit">
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/profile/settings">
                <Settings className="h-4 w-4 mr-2" />
                Cài đặt
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{user.posts}</p>
              <p className="text-sm text-muted-foreground">Bài viết</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{user.followers}</p>
              <p className="text-sm text-muted-foreground">Người theo dõi</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{user.following}</p>
              <p className="text-sm text-muted-foreground">Đang theo dõi</p>
            </CardContent>
          </Card>
          <Card className="bg-card md:col-span-3">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Bài viết</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden md:inline">Hình ảnh</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              <span className="hidden md:inline">Đã lưu</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Giới thiệu</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {userPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Bạn chưa có bài viết nào</p>
                <Button asChild>
                  <Link href="/posts/create">Tạo bài viết đầu tiên</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="aspect-square relative rounded-md overflow-hidden">
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
            {photos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Bạn chưa có hình ảnh nào</p>
                <Button asChild>
                  <Link href="/posts/create">Tải lên hình ảnh</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {savedPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Bạn chưa lưu bài viết nào</p>
                <Button asChild>
                  <Link href="/posts">Khám phá bài viết</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Giới thiệu</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Thông tin cá nhân</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Sống tại {user.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Tham gia {user.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Giới thiệu</h3>
                    <p>{user.bio}</p>
                  </div>

                  <div className="pt-4">
                    <Button asChild>
                      <Link href="/profile/edit">
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa thông tin
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

