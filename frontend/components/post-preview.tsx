import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { formatDate } from "@/lib/utils"
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react"

interface PostPreviewProps {
  post: {
    title: string
    content: string
    place: {
      name: string
      address: string
      averageStar: number
    }
    category: {
      name: string
      slug: string
    }
    author: {
      name: string
      avatar_path: string
    }
    images?: string[]
    createdAt: string
  }
}

export function PostPreview({ post }: PostPreviewProps) {
  const getCategoryColor = (slug: string) => {
    const colors: Record<string, string> = {
      beach: "bg-blue-500",
      mountain: "bg-green-500",
      city: "bg-purple-500",
      island: "bg-yellow-500",
      countryside: "bg-amber-800",
    }
    return colors[slug] || "bg-primary"
  }

  const categoryColor = getCategoryColor(post.category.slug)

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={post.author.avatar_path} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDate(post.createdAt)}</span>
              {post.category.slug && (
                <>
                  <span>•</span>
                  <Badge className={`${getCategoryColor(post.category.slug)} hover:opacity-90`}>
                    {post.category.name}
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-2">{post.title}</h2>

        {(post.place.name || post.place.address) && (
          <div className="flex items-start gap-2 mb-4 text-sm">
            <div className="mt-1">📍</div>
            <div>
              {post.place.name && <p className="font-medium">{post.place.name}</p>}
              {post.place.address && <p className="text-muted-foreground">{post.place.address}</p>}
              {post.place.averageStar > 0 && (
                <div className="mt-1">
                  <StarRating rating={post.place.averageStar} />
                </div>
              )}
            </div>
          </div>
        )}

        <p className="whitespace-pre-line mb-4">{post.content}</p>

        {post.images && post.images.length > 0 && (
          <div className={`grid ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2 mb-4`}>
            {post.images.map((image, index) => (
              <div
                key={index}
                className={`relative ${post.images!.length === 1 ? "aspect-video" : "aspect-square"} rounded-md overflow-hidden`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-b py-2 mt-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp className="h-5 w-5" />
              <span>Thích</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span>Bình luận</span>
            </button>
          </div>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Share2 className="h-5 w-5" />
            <span>Chia sẻ</span>
          </button>
        </div>
      </div>
    </div>
  )
}

