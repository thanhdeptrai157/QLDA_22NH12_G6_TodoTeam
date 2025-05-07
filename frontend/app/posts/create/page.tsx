"use client"

import Link from "next/link"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MapPin, ImageIcon, Smile, X, PlusCircle, Eye, Search, ChevronLeft } from "lucide-react"
import { PostPreview } from "@/components/post-preview"

export default function CreatePostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [activeTab, setActiveTab] = useState("post")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [showPlaceSearch, setShowPlaceSearch] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    placeName: "",
    placeAddress: "",
    placeId: "",
    category: "",
    province: "",
  })

  // Check if there's a place ID or province in the URL
  useEffect(() => {
    const placeId = searchParams.get("place")
    const province = searchParams.get("province")

    if (placeId) {
      // Mock fetching place data
      const mockPlace = {
        id: placeId,
        name: "Vịnh Hạ Long",
        address: "Quảng Ninh, Việt Nam",
      }

      setFormData((prev) => ({
        ...prev,
        placeName: mockPlace.name,
        placeAddress: mockPlace.address,
        placeId: mockPlace.id,
      }))
    } else if (province) {
      // Set province but leave place empty for user to select
      setFormData((prev) => ({
        ...prev,
        province: province,
      }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setSelectedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePlaceSearch = () => {
    // Mock search results
    if (searchTerm.trim()) {
      setSearchResults([
        { id: 1, name: "Vịnh Hạ Long", address: "Quảng Ninh, Việt Nam" },
        { id: 2, name: "Hạ Long Bay Cruise", address: "Quảng Ninh, Việt Nam" },
        { id: 3, name: "Hang Sửng Sốt - Hạ Long", address: "Quảng Ninh, Việt Nam" },
      ])
    } else {
      setSearchResults([])
    }
  }

  const selectPlace = (place: any) => {
    setFormData((prev) => ({
      ...prev,
      placeName: place.name,
      placeAddress: place.address,
      placeId: place.id.toString(),
    }))
    setShowPlaceSearch(false)
    setSearchResults([])
    setSearchTerm("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({
        title: "Tiêu đề không được để trống",
        description: "Vui lòng nhập tiêu đề cho bài viết của bạn",
        variant: "destructive",
      })
      return
    }

    if (!formData.placeName) {
      toast({
        title: "Địa điểm không được để trống",
        description: "Vui lòng chọn địa điểm cho bài viết của bạn",
        variant: "destructive",
      })
      return
    }

    if (rating === 0) {
      toast({
        title: "Đánh giá không hợp lệ",
        description: "Vui lòng đánh giá địa điểm từ 1-5 sao",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful post creation
      toast({
        title: "Đăng bài thành công",
        description: "Bài viết của bạn đã được đăng thành công!",
      })

      router.push("/posts")
    } catch (error) {
      toast({
        title: "Đăng bài thất bại",
        description: "Có lỗi xảy ra khi đăng bài viết",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const mockUser = {
    name: "Nguyễn Văn A",
    avatarPath: "/placeholder.svg?height=40&width=40",
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2" asChild>
          <Link href="/posts">
            <ChevronLeft className="h-4 w-4 mr-2" />
            <span>Quay lại</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Tạo bài viết mới</h1>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Avatar>
              <AvatarImage src={mockUser.avatarPath} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{mockUser.name}</p>
              <p className="text-sm text-muted-foreground">Đang chia sẻ trải nghiệm du lịch</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="post" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span>Bài viết</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Xem trước</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="post">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Input
                      id="title"
                      name="title"
                      placeholder="Tiêu đề bài viết"
                      className="text-lg font-medium border-none px-0 focus-visible:ring-0"
                      required
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    {showPlaceSearch ? (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex gap-2 mb-2">
                          <Input
                            placeholder="Tìm kiếm địa điểm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow"
                          />
                          <Button type="button" onClick={handlePlaceSearch}>
                            <Search className="h-4 w-4" />
                          </Button>
                          <Button type="button" variant="ghost" onClick={() => setShowPlaceSearch(false)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {searchResults.length > 0 && (
                          <div className="bg-background border rounded-md mt-1 max-h-60 overflow-y-auto">
                            {searchResults.map((place) => (
                              <div
                                key={place.id}
                                className="p-2 hover:bg-muted cursor-pointer"
                                onClick={() => selectPlace(place)}
                              >
                                <div className="font-medium">{place.name}</div>
                                <div className="text-sm text-muted-foreground">{place.address}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                        {formData.placeName ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow">
                            <div>
                              <p className="font-medium">{formData.placeName}</p>
                              <p className="text-sm text-muted-foreground">{formData.placeAddress}</p>
                            </div>
                            <div className="flex justify-end items-center">
                              <Button type="button" variant="ghost" size="sm" onClick={() => setShowPlaceSearch(true)}>
                                Thay đổi
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button type="button" variant="ghost" onClick={() => setShowPlaceSearch(true)}>
                            Chọn địa điểm
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="w-full md:w-auto">
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beach">Biển</SelectItem>
                          <SelectItem value="mountain">Núi</SelectItem>
                          <SelectItem value="city">Thành phố</SelectItem>
                          <SelectItem value="island">Đảo</SelectItem>
                          <SelectItem value="countryside">Làng quê</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Đánh giá:</span>
                      <StarRating rating={rating} size="md" interactive={true} onChange={handleRatingChange} />
                    </div>
                  </div>

                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                    rows={6}
                    className="resize-none"
                    required
                    value={formData.content}
                    onChange={handleChange}
                  />

                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative group aspect-video">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {selectedImages.length < 5 && (
                        <button
                          type="button"
                          onClick={handleImageClick}
                          className="border-2 border-dashed border-muted-foreground/30 rounded-md flex items-center justify-center aspect-video hover:border-primary/50 transition-colors"
                        >
                          <PlusCircle className="h-8 w-8 text-muted-foreground/50" />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 border-t pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={handleImageClick}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      <span>Hình ảnh</span>
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="rounded-full">
                      <Smile className="h-4 w-4 mr-2" />
                      <span>Cảm xúc</span>
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Đang đăng bài..." : "Đăng bài"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="preview">
              <PostPreview
                post={{
                  title: formData.title || "Tiêu đề bài viết",
                  content: formData.content || "Nội dung bài viết",
                  place: {
                    name: formData.placeName || "Tên địa điểm",
                    address: formData.placeAddress || "Địa chỉ",
                    averageStar: rating,
                  },
                  category: {
                    name:
                      formData.category === "beach"
                        ? "Biển"
                        : formData.category === "mountain"
                          ? "Núi"
                          : formData.category === "city"
                            ? "Thành phố"
                            : formData.category === "island"
                              ? "Đảo"
                              : formData.category === "countryside"
                                ? "Làng quê"
                                : "Chọn danh mục",
                    slug: formData.category,
                  },
                  author: {
                    name: mockUser.name,
                    avatarPath: mockUser.avatarPath,
                  },
                  images: selectedImages,
                  createdAt: new Date().toISOString(),
                }}
              />
              <div className="mt-6">
                <Button type="button" className="w-full" onClick={() => setActiveTab("post")}>
                  Quay lại chỉnh sửa
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

