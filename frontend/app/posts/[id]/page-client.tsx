"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/user"
import { likeService } from "@/service/like-service"
import { MapPin, ThumbsUp, MessageSquare, Share2, Bookmark, ChevronLeft, Flag } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { formatDate } from "@/lib/utils"
import { CommentSection } from "@/components/comment-section"
import Image from "next/image"
import Link from "next/link"

export function PageClient({ post }: { post: any }) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [likes, setLikes] = useState(post.likes)
  const [likedByUser, setLikedByUser] = useState(false);

useEffect(() => {
  if (Array.isArray(post.like) && user?.id) {
    setLikedByUser(post.like.some((like: { user_id: number }) => like.user_id === Number(user.id)));
  } else {
    setLikedByUser(false);
  }
}, [post.like, user]);
    console.log("Post:", post)
    const handleLike = () => {
      console.log(likedByUser);
    if (!user) {
      router.push("/login")
      return
    }

    if (likedByUser) {
      likeService.deleteLike({ is_post: true, user_id: Number(user.id), target_id: post.id })
      setLikes((prev: number) => prev - 1)
      setLikedByUser(false)
    } else {
      likeService.createLike({ is_post: true, user_id: Number(user.id), target_id: post.id })
      setLikes((prev: number) => prev + 1)
      setLikedByUser(true)
    }
  }

  const getCategoryColor = (id: number) => {
    const colors: Record<number, string> = {
      1: "bg-blue-500",
      2: "bg-green-500",
      3: "bg-purple-500",
      4: "bg-yellow-500",
      5: "bg-amber-800",
    }
    return colors[id] || "bg-primary"
  }

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
                {post.content.split("\n\n").map((paragraph: any, index: number) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-b py-3 mt-6">
                <div className="flex items-center gap-4">
                  <button
                    className={`flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ${likedByUser ? "text-primary" : ""}`}
                    onClick={handleLike}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>Thích ({likes})</span>
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
