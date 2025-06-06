"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import type { Post } from "@/types/post"
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
        setUserPosts(posts)
      } catch (err) {
        console.error("Error fetching user posts:", err)
      }
    }

    fetchPosts()
  }, [user?.id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Cover Photo with Gradient Overlay */}
      <div className="relative h-[280px] md:h-[320px] lg:h-[380px] w-full overflow-hidden">
        <Image src={user?.cover_path || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Enhanced Profile Header */}
        <div className="relative -mt-16 mb-8">
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 shadow-2xl shadow-black/10">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar Section */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  <Avatar className="relative h-32 w-32 md:h-36 md:w-36 border-4 border-white dark:border-slate-800 shadow-xl">
                    <AvatarImage src={user?.avatar_path || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10 w-10 shadow-lg border-2 border-white dark:border-slate-800"
                    asChild
                  >
                    <Link href="/profile/edit">
                      <Camera className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="flex-grow text-center md:text-left">
                  <div className="mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                      {user?.name}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">@{user?.email}</p>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 max-w-2xl mb-4 leading-relaxed">
                    {user?.bio || "Chưa cập nhật thông tin giới thiệu"}
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1">
                      <MapPin className="h-3 w-3" />
                      {user?.address || "Chưa cập nhật"}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1">
                      <Calendar className="h-3 w-3" />
                      Tham gia 2024
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/profile/edit">
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{userPosts.length}</div>
              <p className="text-blue-700 dark:text-blue-300 font-medium">Bài viết</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">1.2K</div>
              <p className="text-purple-700 dark:text-purple-300 font-medium">Người theo dõi</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">856</div>
              <p className="text-green-700 dark:text-green-300 font-medium">Đang theo dõi</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info Card */}
        <Card className="mb-8 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300">{user?.phone || "Chưa cập nhật"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <Card className="mb-6">
            <CardContent className="p-2">
              <TabsList className="grid grid-cols-4 w-full bg-transparent gap-1">
                <TabsTrigger
                  value="posts"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Bài viết</span>
                </TabsTrigger>
                <TabsTrigger
                  value="photos"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Hình ảnh</span>
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Đã lưu</span>
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Giới thiệu</span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {!isLoading ? (
            <TabsContent value="posts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {userPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <PostCard post={post} />
                  </Card>
                ))}
              </div>
              {userPosts.length === 0 && (
                <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                  <CardContent className="text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Chưa có bài viết nào</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Hãy chia sẻ những suy nghĩ và trải nghiệm của bạn
                    </p>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                      asChild
                    >
                      <Link href="/posts/create">Tạo bài viết đầu tiên</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ) : (
            <TabsContent value="posts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <div className="h-48 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg animate-pulse" />
                      <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-md w-3/4 animate-pulse" />
                      <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-md w-1/2 animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}

          <TabsContent value="photos" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <CardContent className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Chưa có hình ảnh nào</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Chia sẻ những khoảnh khắc đẹp của bạn</p>
                <Button
                  className="bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white shadow-lg"
                  asChild
                >
                  <Link href="/posts/create">Tải lên hình ảnh</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <CardContent className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Chưa lưu bài viết nào</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Lưu những bài viết yêu thích để đọc lại sau</p>
                <Button
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg"
                  asChild
                >
                  <Link href="/posts">Khám phá bài viết</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Giới thiệu
                </h2>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl">
                    <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Thông tin cá nhân</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                          <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">
                          Sống tại {user?.address || "Chưa cập nhật"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                          <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                          <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">{user?.phone || "Chưa cập nhật"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl">
                    <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Giới thiệu bản thân</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {user?.bio || "Chưa cập nhật thông tin giới thiệu"}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                      asChild
                    >
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
