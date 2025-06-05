"use client"

import { useEffect, useState } from "react"
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
import { useAuthStore } from "@/store/user"
import { Post } from "@/types/post"
import { usePost } from "@/hooks/use-post"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const { user } = useAuthStore()
  const { isLoading, error, getPostByUserId } = usePost()


  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?.id) return

      try {
        const posts = await getPostByUserId(Number.parseInt(user?.id))
        console.log(posts)
        setUserPosts(posts)
      } catch (err) {
        console.error("Error fetching user posts:", err)
      }
    }

    fetchPosts()
  }, [user?.id])
  console.log(isLoading)
  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      {/* Cover Photo */}
      <div className="relative h-[300px] md:h-[350px] lg:h-[400px] w-full">
        <Image src={user?.avatarPath || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
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
              <AvatarImage src={user?.avatarPath} alt={user?.name} />
              <AvatarFallback className="text-4xl">{user?.name.charAt(0)}</AvatarFallback>
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
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground">@{user?.email}</p>
            {/* <p className="mt-2 max-w-xl">{user.bio}</p> */}

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {/* <span>{user.location}</span> */}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {/* <span>Tham gia {user.joinDate}</span> */}
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
              {/* <p className="text-2xl font-bold">{user.posts}</p> */}
              <p className="text-sm text-muted-foreground">Bài viết</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              {/* <p className="text-2xl font-bold">{user.followers}</p> */}
              <p className="text-sm text-muted-foreground">Người theo dõi</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              {/* <p className="text-2xl font-bold">{user.following}</p> */}
              <p className="text-sm text-muted-foreground">Đang theo dõi</p>
            </CardContent>
          </Card>
          <Card className="bg-card md:col-span-3">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {/* <span>{user?.}</span> */}
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

          {!isLoading ? (
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
          ) : (
            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg shadow">
                    <div className="h-40 bg-gray-200 rounded-md animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse" />
                  </div>
                ))}
              </div>
            </TabsContent>
          )}

          {/* <TabsContent value="photos" className="mt-6">
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
          </TabsContent> */}

          {/* <TabsContent value="about" className="mt-6">
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
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  )
}

