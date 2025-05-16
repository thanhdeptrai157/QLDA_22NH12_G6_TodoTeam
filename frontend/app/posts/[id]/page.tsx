import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { formatDate } from "@/lib/utils"
import { PostCard } from "@/components/post-card"
import { CommentSection } from "@/components/comment-section"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ThumbsUp, MessageSquare, Share2, Bookmark, Flag, ChevronLeft } from "lucide-react"
import { postService } from "@/service/post-service"

interface PostPageProps {
  params: {
    id: string
  }
}

const getCategoryColor = (slug: string) => {
  const colors: Record<string, string> = {
    1: "bg-blue-500",
    2: "bg-green-500",
    3: "bg-purple-500",
    4: "bg-yellow-500",
    5: "bg-amber-800",
  }
  return colors[slug] || "bg-primary"
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = params
  const post = await postService.getDetailPost(Number.parseInt(id)) 
  console.log(post)
  // Mock post data
 

  // Mock related posts
  const relatedPosts = [
    {
      id: 2,
      title: "Bãi biển Mỹ Khê - Thiên đường nghỉ dưỡng",
      content: "Bãi biển Mỹ Khê được tạp chí Forbes bình chọn là một trong những bãi biển quyến rũ nhất hành tinh...",
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
        name: "Bãi biển Mỹ Khê",
        address: "Đà Nẵng, Việt Nam",
        averageStar: 4.6,
      },
      category: {
        name: "Biển",
        slug: "beach",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
    {
      id: 3,
      title: "Bãi Sao Phú Quốc - Cát trắng nước xanh",
      content:
        "Bãi Sao được mệnh danh là một trong những bãi biển đẹp nhất Việt Nam với bờ cát trắng mịn và làn nước trong xanh...",
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
        name: "Bãi Sao",
        address: "Phú Quốc, Kiên Giang, Việt Nam",
        averageStar: 4.9,
      },
      category: {
        name: "Biển",
        slug: "beach",
      },
      images: ["/placeholder.svg?height=300&width=500"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/posts">
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Quay lại</span>
            </Link>
          </Button>

          <article className="bg-card rounded-xl shadow-sm overflow-hidden">
            {/* Post Header */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  {/* <AvatarImage src={post?.user?.avatarPath} alt={post.author.name} /> */}
                  <AvatarFallback>{post?.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post?.user?.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatDate(post?.created_at)}</span>
                    <span>•</span>
                    <Badge className={`${getCategoryColor(post.category.id)} hover:opacity-90`}>
                      {post.category.name}
                    </Badge>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">{post?.title}</h1>

              <div className="flex items-start gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{post?.place?.name}</p>
                  <p className="text-muted-foreground">{post?.place?.address}</p>
                  <div className="mt-1">
                    <StarRating rating={post?.stars} size="md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Post Images */}
            {post.image && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="md:col-span-2 h-80 relative">
                  <Image src={post.image[0] || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                {post.image.length > 1 && (
                  <div className="h-40 relative">
                    <Image src={post.image[1] || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                )}
                {post.image.length > 2 && (
                  <div className="h-40 relative">
                    <Image src={post.image[2] || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    {post.image.length > 3 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">+{post.image.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Post Content */}
            <div className="p-6">
              <div className="prose max-w-none">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-b py-3 mt-6">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp className="h-5 w-5" />
                    <span>Thích ({post.likes})</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span>Bình luận (23)</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Bookmark className="h-5 w-5" />
                    <span>Lưu</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <CommentSection postId={post.id} />
            </div>
          </article>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-20">
            <Card className="mb-6">
              <CardContent className="p-4">
                <h2 className="text-lg font-bold mb-4">Thông tin địa điểm</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{post.place.name}</h3>
                    <p className="text-muted-foreground">{post.place.address}</p>
                    <div className="mt-1">
                      <StarRating rating={post.place.averageStar} />
                    </div>
                  </div>
                  <div>
                    <Button className="w-full" asChild>
                      <Link href={`/places/${post.place.id}`}>Xem chi tiết địa điểm</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Bài viết liên quan</h2>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} layout="horizontal" />
                ))}
              </div>
            </div> */}

            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-bold mb-4">Báo cáo bài viết</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Nếu bạn thấy bài viết này có nội dung không phù hợp, hãy báo cáo cho chúng tôi.
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  <Flag className="h-4 w-4 mr-2" />
                  <span>Báo cáo vi phạm</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

