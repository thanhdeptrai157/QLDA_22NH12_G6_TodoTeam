"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
import { useAuthStore } from "@/store/user"
import { add } from "date-fns"
import { authService } from "@/service/auth-service"
import { useGoong } from "@/hooks/use-goong"

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const {user} = useAuthStore()
  // Mock user data
  const [formData, setFormData] = useState({
    name: user?.name!,
    bio: user?.bio!,
    email: user?.email!,
    phone: user?.phone!,
    address: user?.address!,
    avatar_path: user?.avatar_path!,
    cover_path: user?.cover_path!,
    password: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const { isLoading: isPlaceLoading, error: placeError, data: placeData, fetchPlaceSuggestion } = useGoong()
  const [showAddressSearch, setShowAddressSearch] = useState(false)
  const [addressSearchTerm, setAddressSearchTerm] = useState("")
  const [addressResults, setAddressResults] = useState<any[]>([])

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
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, avatar_path: imageUrl }))
      setAvatarFile(file)
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, cover_path: imageUrl }))
      setCoverFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let coverUrl = formData.cover_path
      let avatarUrl = formData.avatar_path
      if (coverFile) {
        const filePath = `cover_${Date.now()}`
        const uploadForm = new FormData()
        uploadForm.append('file', coverFile)
        uploadForm.append('filePath', filePath)
        const res = await fetch('/api/supabase-upload', {
          method: 'POST',
          body: uploadForm,
        })
        if (!res.ok) throw new Error('Upload error')
        const { publicUrl } = await res.json()
        coverUrl = publicUrl
      }
      if (avatarFile) {
        const filePath = `avatar_${Date.now()}`
        const uploadForm = new FormData()
        uploadForm.append('file', avatarFile)
        uploadForm.append('filePath', filePath)
        const res = await fetch('/api/supabase-upload', {
          method: 'POST',
          body: uploadForm,
        })
        if (!res.ok) throw new Error('Upload error')
        const { publicUrl } = await res.json()
        avatarUrl = publicUrl
      }

      const response = await authService.updateProfile({
        id: Number.parseInt(user?.id!),
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
        address: formData.address,
        avatar_path: avatarUrl,
        cover_path: coverUrl,
      })
      if (response.status == 200) {
        console.log("Profile updated successfully")
        const userData = response.data.user as User
        useAuthStore.getState().setUser({
          ...userData,
        })
      }
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

  // Gợi ý địa chỉ khi nhập
  useEffect(() => {
    if (!showAddressSearch) return
    if (!addressSearchTerm.trim()) {
      setAddressResults([])
      return
    }
    const handler = setTimeout(() => {
      fetchPlaceSuggestion(addressSearchTerm)
    }, 500)
    return () => clearTimeout(handler)
  }, [addressSearchTerm, showAddressSearch])

  useEffect(() => {
    if (placeData?.predictions) {
      setAddressResults(
        placeData.predictions.map((item: any) => ({
          id: item.place_id,
          name: item.description,
        }))
      )
    }
  }, [placeData])

  const handleSelectAddress = (item: any) => {
    setFormData((prev) => ({ ...prev, address: item.name }))
    setShowAddressSearch(false)
    setAddressSearchTerm("")
    setAddressResults([])
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
                    <Image src={formData.cover_path || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
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
                        <AvatarImage src={formData.avatar_path} alt={formData.name} />
                        <AvatarFallback>{formData.name?.charAt(0)}</AvatarFallback>
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
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  {showAddressSearch ? (
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <Input
                        placeholder="Tìm kiếm địa chỉ..."
                        value={addressSearchTerm}
                        onChange={e => setAddressSearchTerm(e.target.value)}
                        className="mb-2"
                        autoFocus
                      />
                      {isPlaceLoading && <div className="text-sm text-muted-foreground">Đang tìm kiếm...</div>}
                      {placeError && <div className="text-sm text-destructive">{placeError}</div>}
                      {addressResults.length > 0 && !isPlaceLoading && (
                        <div className="bg-background border rounded-md max-h-60 overflow-y-auto">
                          {addressResults.map((item) => (
                            <div
                              key={item.id}
                              className="p-2 hover:bg-muted cursor-pointer"
                              onClick={() => handleSelectAddress(item)}
                            >
                              {item.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        readOnly
                        className="flex-grow"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => setShowAddressSearch(true)}>
                        Tìm kiếm
                      </Button>
                    </div>
                  )}
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

