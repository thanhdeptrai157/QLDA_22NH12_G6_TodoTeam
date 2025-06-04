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
  const [likedByUser, setLikedByUser] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null)
  const images = post.image || []

  useEffect(() => {
    if (Array.isArray(post.like) && user?.id) {
      setLikedByUser(post.like.some((like: { user_id: number }) => like.user_id === Number(user.id)))
    } else {
      setLikedByUser(false)
    }
  }, [post.like, user])
  console.log("Post:", post)
  const handleLike = () => {
    console.log(likedByUser)
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
      {/* Enhanced Modal for zoomed image with better navigation */}
      {modalImageIndex !== null && images[modalImageIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300"
          onClick={() => setModalImageIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
          

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm">
              {modalImageIndex + 1} / {images.length}
            </div>

            {/* Previous button */}
            {modalImageIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-all duration-200 backdrop-blur-sm hover:scale-110 group"
                onClick={() => setModalImageIndex((idx) => (idx !== null && idx > 0 ? idx - 1 : idx))}
              >
                <svg
                  className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {modalImageIndex < images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-all duration-200 backdrop-blur-sm hover:scale-110 group"
                onClick={() => setModalImageIndex((idx) => (idx !== null && idx < images.length - 1 ? idx + 1 : idx))}
              >
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Main image */}
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <Image
                src={images[modalImageIndex] || "/placeholder.svg"}
                alt="Zoomed"
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-300"
                priority
              />
            </div>

            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-3 rounded-full backdrop-blur-sm">
                {images.slice(0, 5).map((img: string, index: number) => (
                  <button
                    key={index}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                      index === modalImageIndex
                        ? "ring-2 ring-white scale-110"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setModalImageIndex(index)}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
                {images.length > 5 && (
                  <div className="flex items-center justify-center w-12 h-12 bg-black/50 rounded-lg text-white text-xs">
                    +{images.length - 5}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
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
                  {/* <AvatarImage src={post?.user?.avatarPath || "/placeholder.svg"} alt={post.author.name} /> */}
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

            {/* Enhanced Post Images Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                <div
                  className="md:col-span-2 h-80 relative cursor-zoom-in group overflow-hidden rounded-lg"
                  onClick={() => setModalImageIndex(0)}
                >
                  <Image
                    src={images[0] || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {images.length > 1 && (
                  <div
                    className="h-40 relative cursor-zoom-in group overflow-hidden rounded-lg"
                    onClick={() => setModalImageIndex(1)}
                  >
                    <Image
                      src={images[1] || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                {images.length > 2 && (
                  <div
                    className="h-40 relative cursor-zoom-in group overflow-hidden rounded-lg"
                    onClick={() => setModalImageIndex(2)}
                  >
                    <Image
                      src={images[2] || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {images.length > 3 && (
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-lg">
                        <span className="text-white text-xl font-bold">+{images.length - 3}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
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
                    <span>Bình luận </span>
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
                      <StarRating rating={post.place.average_stars} />
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
