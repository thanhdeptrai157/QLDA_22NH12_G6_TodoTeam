"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Camera } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  // Mock user data
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    username: "nguyenvana",
    bio: "Yêu du lịch | Nhiếp ảnh gia | Foodie | Đã đến 20+ tỉnh thành Việt Nam",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    location: "Hà Nội, Việt Nam",
    avatarPath: "/placeholder.svg?height=200&width=200",
    coverPath: "/placeholder.svg?height=400&width=1200",
    password: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    avatarInputRef.current?.click()
  }

  const handleCoverClick = () => {
    coverInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, avatarPath: imageUrl }))
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, coverPath: imageUrl }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Cập nhật thành công",
        description: "Thông tin cá nhân của bạn đã được cập nhật",
      })

      router.push("/profile")
    } catch (error) {
      toast({
        title: "Cập nhật thất bại",
        description: "Có lỗi xảy ra khi cập nhật thông tin",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Cập nhật thành công",
        description: "Mật khẩu của bạn đã được cập nhật",
      })

      setFormData((prev) => ({
        ...prev,
        password: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      toast({
        title: "Cập nhật thất bại",
        description: "Có lỗi xảy ra khi cập nhật mật khẩu",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Chỉnh sửa trang cá nhân</h1>

      <Tabs defaultValue="profile" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="password">Mật khẩu</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>Cập nhật thông tin cá nhân và hình ảnh của bạn</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Cover Photo */}
                <div className="space-y-2">
                  <Label>Ảnh bìa</Label>
                  <div className="relative h-[200px] w-full rounded-md overflow-hidden border">
                    <Image src={formData.coverPath || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        variant="secondary"
                        className="bg-white/80 text-black"
                        onClick={handleCoverClick}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Thay đổi ảnh bìa
                      </Button>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={coverInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                </div>

                {/* Avatar */}
                <div className="space-y-2">
                  <Label>Ảnh đại diện</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={formData.avatarPath} alt={formData.name} />
                        <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button
                        type="button"
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full bg-primary text-white h-8 w-8"
                        onClick={handleAvatarClick}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Tải lên ảnh đại diện của bạn. Nên sử dụng ảnh vuông có kích thước tối thiểu 200x200 pixels.
                      </p>
                      <Button type="button" variant="outline" size="sm" onClick={handleAvatarClick}>
                        Thay đổi ảnh
                      </Button>
                    </div>
                    <input
                      type="file"
                      ref={avatarInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Tên người dùng</Label>
                    <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Địa chỉ</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.push("/profile")}>
                  Hủy
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Thay đổi mật khẩu</CardTitle>
              <CardDescription>Cập nhật mật khẩu của bạn để bảo mật tài khoản</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu hiện tại</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.push("/profile")}>
                  Hủy
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

