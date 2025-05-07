import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, MapPin } from "lucide-react"

export default function ExperiencesPage() {
  // Mock experiences data
  const experiences = [
    {
      id: 1,
      author: {
        id: 1,
        name: "Nguyễn Văn A",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      content: "Vừa có chuyến du lịch tuyệt vời tại Vịnh Hạ Long! Cảnh đẹp quá, nhất định phải quay lại lần nữa.",
      images: ["/placeholder.svg?height=500&width=800", "/placeholder.svg?height=500&width=800"],
      location: "Vịnh Hạ Long, Quảng Ninh",
      feeling: "hạnh phúc",
      createdAt: "2025-03-20T10:30:00",
      likes: 245,
      comments: 32,
      shares: 15,
      background: null,
    },
    {
      id: 2,
      author: {
        id: 2,
        name: "Trần Thị B",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      content: "Đà Lạt mùa này đẹp quá! Sương mù buổi sáng, nắng nhẹ buổi chiều, và những đồi thông bạt ngàn.",
      images: ["/placeholder.svg?height=500&width=800"],
      location: "Đà Lạt, Lâm Đồng",
      feeling: "thư giãn",
      createdAt: "2025-03-18T15:45:00",
      likes: 189,
      comments: 24,
      shares: 8,
      background: null,
    },
    {
      id: 3,
      author: {
        id: 3,
        name: "Lê Văn C",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      content: "Cuối tuần vừa rồi mình đã có cơ hội khám phá Phố cổ Hội An. Thật sự là một trải nghiệm tuyệt vời!",
      images: [],
      location: "Hội An, Quảng Nam",
      feeling: "phấn khích",
      createdAt: "2025-03-15T20:15:00",
      likes: 156,
      comments: 18,
      shares: 5,
      background: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "Vừa xong"
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`
    } else {
      return date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trải nghiệm</h1>
        <Button asChild>
          <Link href="/experiences/create">Tạo trải nghiệm mới</Link>
        </Button>
      </div>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <Card key={experience.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={experience.author.avatarPath} alt={experience.author.name} />
                    <AvatarFallback>{experience.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-medium">{experience.author.name}</p>
                      {experience.feeling && (
                        <span className="text-sm text-muted-foreground">đang cảm thấy {experience.feeling}</span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{formatDate(experience.createdAt)}</span>
                      {experience.location && (
                        <>
                          <span className="mx-1">•</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{experience.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>

              {experience.background ? (
                <div
                  className={`${experience.background} text-white p-8 rounded-lg mb-4 text-center font-bold text-xl`}
                >
                  {experience.content}
                </div>
              ) : (
                <p className="mb-4">{experience.content}</p>
              )}

              {experience.images && experience.images.length > 0 && (
                <div className={`grid ${experience.images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2 mb-4`}>
                  {experience.images.map((image, index) => (
                    <div key={index} className="relative aspect-video">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <div className="bg-primary text-white rounded-full p-1">
                    <ThumbsUp className="h-3 w-3" />
                  </div>
                  <span>{experience.likes}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{experience.comments} bình luận</span>
                  <span>{experience.shares} chia sẻ</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <Button variant="ghost" className="flex-1 flex items-center justify-center gap-2">
                  <ThumbsUp className="h-5 w-5" />
                  <span>Thích</span>
                </Button>
                <Button variant="ghost" className="flex-1 flex items-center justify-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Bình luận</span>
                </Button>
                <Button variant="ghost" className="flex-1 flex items-center justify-center gap-2">
                  <Share2 className="h-5 w-5" />
                  <span>Chia sẻ</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

