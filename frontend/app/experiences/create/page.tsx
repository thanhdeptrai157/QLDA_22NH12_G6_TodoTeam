"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  Camera,
  MapPin,
  ImageIcon,
  Smile,
  X,
  PlusCircle,
  Video,
  Music,
  LinkIcon,
  Globe,
  Lock,
  Users,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function CreateExperiencePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [selectedMedia, setSelectedMedia] = useState<{ type: "image" | "video"; url: string }[]>([])
  const [privacy, setPrivacy] = useState("public")
  const [feeling, setFeeling] = useState("")
  const [location, setLocation] = useState("")
  const [taggedFriends, setTaggedFriends] = useState<string[]>([])
  const [content, setContent] = useState("")
  const [backgroundType, setBackgroundType] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("post")

  // Mock user data
  const user = {
    name: "Nguyễn Văn A",
    avatarPath: "/placeholder.svg?height=40&width=40",
  }

  // Mock friends data
  const friends = [
    { id: 1, name: "Trần Thị B", avatarPath: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Lê Văn C", avatarPath: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Phạm Thị D", avatarPath: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Hoàng Văn E", avatarPath: "/placeholder.svg?height=40&width=40" },
  ]

  // Mock feelings data
  const feelings = [
    "vui vẻ",
    "hạnh phúc",
    "phấn khích",
    "thư giãn",
    "mệt mỏi",
    "buồn",
    "tuyệt vời",
    "biết ơn",
    "đói",
    "ốm",
    "đang du lịch",
  ]

  // Mock background colors
  const backgrounds = [
    { id: "blue-gradient", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { id: "green-gradient", color: "bg-gradient-to-r from-green-500 to-green-700" },
    { id: "purple-gradient", color: "bg-gradient-to-r from-purple-500 to-purple-700" },
    { id: "orange-gradient", color: "bg-gradient-to-r from-orange-500 to-orange-700" },
    { id: "pink-gradient", color: "bg-gradient-to-r from-pink-500 to-pink-700" },
    { id: "yellow-gradient", color: "bg-gradient-to-r from-yellow-500 to-yellow-700" },
    { id: "red-gradient", color: "bg-gradient-to-r from-red-500 to-red-700" },
    { id: "teal-gradient", color: "bg-gradient-to-r from-teal-500 to-teal-700" },
  ]

  const handleMediaClick = (type: "image" | "video") => {
    if (type === "image") {
      fileInputRef.current?.click()
    } else {
      videoInputRef.current?.click()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newMedia = Array.from(files).map((file) => ({
        type: "image" as const,
        url: URL.createObjectURL(file),
      }))
      setSelectedMedia((prev) => [...prev, ...newMedia])
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newMedia = Array.from(files).map((file) => ({
        type: "video" as const,
        url: URL.createObjectURL(file),
      }))
      setSelectedMedia((prev) => [...prev, ...newMedia])
    }
  }

  const removeMedia = (index: number) => {
    setSelectedMedia((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleFriendTag = (friendName: string) => {
    setTaggedFriends((prev) =>
      prev.includes(friendName) ? prev.filter((name) => name !== friendName) : [...prev, friendName],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() && selectedMedia.length === 0 && !backgroundType) {
      toast({
        title: "Không thể đăng bài",
        description: "Vui lòng thêm nội dung, hình ảnh hoặc chọn nền cho bài viết của bạn",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Đăng bài thành công",
        description: "Trải nghiệm của bạn đã được chia sẻ thành công!",
      })

      router.push("/")
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

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Tạo trải nghiệm mới</h1>

          <div className="flex items-center gap-3 mb-6">
            <Avatar>
              <AvatarImage src={user.avatarPath} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <p className="font-medium">{user.name}</p>
                {feeling && <span className="text-sm text-muted-foreground">đang cảm thấy {feeling}</span>}
                {location && <span className="text-sm text-muted-foreground">tại {location}</span>}
              </div>

              <div className="flex items-center mt-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                      {privacy === "public" ? (
                        <>
                          <Globe className="h-4 w-4 mr-1" />
                          <span className="text-xs">Công khai</span>
                        </>
                      ) : privacy === "friends" ? (
                        <>
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-xs">Bạn bè</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-1" />
                          <span className="text-xs">Chỉ mình tôi</span>
                        </>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-3">
                    <h4 className="font-medium mb-2">Ai có thể xem bài viết này?</h4>
                    <RadioGroup value={privacy} onValueChange={setPrivacy}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public" className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          <span>Công khai</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="friends" id="friends" />
                        <Label htmlFor="friends" className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Bạn bè</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private" className="flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          <span>Chỉ mình tôi</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="post" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span>Bài viết</span>
              </TabsTrigger>
              <TabsTrigger value="background" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Nền</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="post">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Bạn đang nghĩ gì?"
                      className="text-lg border-none px-0 focus-visible:ring-0 resize-none min-h-[120px]"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  {selectedMedia.length > 0 && (
                    <div className={`grid ${selectedMedia.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
                      {selectedMedia.map((media, index) => (
                        <div key={index} className="relative group aspect-video">
                          {media.type === "image" ? (
                            <img
                              src={media.url || "/placeholder.svg"}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <video src={media.url} className="w-full h-full object-cover rounded-md" controls />
                          )}
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeMedia(index)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 border rounded-lg p-3">
                    <p className="w-full text-sm font-medium mb-2">Thêm vào bài viết của bạn</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={() => handleMediaClick("image")}
                    >
                      <ImageIcon className="h-5 w-5 text-green-500" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={() => handleMediaClick("video")}
                    >
                      <Video className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="ghost" size="sm" className="rounded-full">
                          <Smile className="h-5 w-5 text-yellow-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <h4 className="font-medium mb-2">Bạn đang cảm thấy thế nào?</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {feelings.map((feel) => (
                            <Button
                              key={feel}
                              type="button"
                              variant="ghost"
                              size="sm"
                              className={`text-xs ${feeling === feel ? "bg-muted" : ""}`}
                              onClick={() => setFeeling(feel)}
                            >
                              {feel}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="ghost" size="sm" className="rounded-full">
                          <MapPin className="h-5 w-5 text-red-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <h4 className="font-medium mb-2">Thêm vị trí</h4>
                        <Input
                          placeholder="Nhập vị trí của bạn"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="mb-2"
                        />
                        <div className="text-sm text-muted-foreground">Gợi ý: Hà Nội, Đà Nẵng, TP. Hồ Chí Minh</div>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="ghost" size="sm" className="rounded-full">
                          <Users className="h-5 w-5 text-purple-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <h4 className="font-medium mb-2">Gắn thẻ bạn bè</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {friends.map((friend) => (
                            <div
                              key={friend.id}
                              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-muted ${
                                taggedFriends.includes(friend.name) ? "bg-muted" : ""
                              }`}
                              onClick={() => toggleFriendTag(friend.name)}
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={friend.avatarPath} alt={friend.name} />
                                <AvatarFallback>{friend.name.charAt(0).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span>{friend.name}</span>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button type="button" variant="ghost" size="sm" className="rounded-full">
                      <Music className="h-5 w-5 text-pink-500" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="rounded-full">
                      <LinkIcon className="h-5 w-5 text-orange-500" />
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                    <input
                      type="file"
                      ref={videoInputRef}
                      className="hidden"
                      accept="video/*"
                      onChange={handleVideoChange}
                    />
                  </div>

                  {taggedFriends.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      <span>Cùng với </span>
                      {taggedFriends.map((friend, index) => (
                        <span key={friend}>
                          <span className="font-medium text-foreground">{friend}</span>
                          {index < taggedFriends.length - 1 && <span>, </span>}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Đang đăng bài..." : "Đăng bài"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="background">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Bạn đang nghĩ gì?"
                    className={`text-lg border-none px-4 py-4 focus-visible:ring-0 resize-none min-h-[200px] text-center flex items-center justify-center ${
                      backgroundType ? backgrounds.find((bg) => bg.id === backgroundType)?.color : ""
                    } ${backgroundType ? "text-white font-bold text-2xl" : ""}`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {backgrounds.map((bg) => (
                    <div
                      key={bg.id}
                      className={`h-16 rounded-md cursor-pointer ${bg.color} ${
                        backgroundType === bg.id ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      onClick={() => setBackgroundType(bg.id)}
                    ></div>
                  ))}
                  <div
                    className="h-16 rounded-md cursor-pointer bg-background border border-dashed border-muted-foreground/50 flex items-center justify-center"
                    onClick={() => setBackgroundType(null)}
                  >
                    <X className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>

                <div className="mt-6">
                  <Button type="button" className="w-full" disabled={isLoading} onClick={handleSubmit}>
                    {isLoading ? "Đang đăng bài..." : "Đăng bài"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

