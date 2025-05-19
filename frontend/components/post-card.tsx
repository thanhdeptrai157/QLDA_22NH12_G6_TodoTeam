import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { formatDate } from "@/lib/utils"
import { ThumbsUp, MessageSquare, Eye, Share2 } from "lucide-react"
import { Post } from "@/types/post"
interface PostCardProps {
  post: Post
  layout?: "vertical" | "horizontal"
}

export function PostCard({ post, layout = "vertical" }: PostCardProps) {
  const getCategoryColor = (id: number) => {
    const colors: Record<string, string> = {
      1: "bg-blue-500",
      2: "bg-green-500",
      3: "bg-purple-500",
      4: "bg-yellow-500",
      5: "bg-amber-800",
    }
    return colors[id] || "bg-primary"
  }

  const categoryColor = getCategoryColor(post?.category_id!)

  if (layout === "horizontal") {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] flex flex-col sm:flex-row">
        <Link href={`/posts/${post.id}`} className="relative sm:w-1/2 h-48 sm:h-auto">
          <Image
            src={post.image?.[0] || "/placeholder.svg?height=300&width=500"}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 right-2 z-10">
            <Badge className={`${categoryColor} hover:opacity-90`}>{post.category.name}</Badge>
          </div>
          <div className="absolute bottom-2 left-2 z-10">
            <StarRating rating={post?.stars!} />
          </div>
        </Link>

        <div className="sm:w-1/2 flex flex-col justify-between">
          <CardHeader className="p-4 pb-2">
            <Link href={`/posts/${post?.id}`} className="block">
              <h3 className="text-lg font-bold line-clamp-2 hover:text-primary transition-colors">{post.title}</h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href={`/places/${post?.place.id}`} className="hover:text-primary transition-colors">
                {post?.place.name}
              </Link>
              <span>•</span>
              {/* <span>{formatDate(post.created_at)}</span> */}
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <p className="text-muted-foreground line-clamp-2">{post?.content}</p>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                {/* <AvatarImage src={post.author.avatarPath} alt={post.user.name} /> */}
                <AvatarFallback>{post?.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{post?.user?.name}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-xs">{post?.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">{post?.commentCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    )
  }


  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover-scale">
      <Link href={`/posts/${post.id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={post.image?.[0] || "/placeholder.svg?height=300&width=500"}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 right-2 z-10">
            <Badge className={`${getCategoryColor(post?.category_id!)} hover:opacity-90`}>{post.category.name}</Badge>
          </div>
          <div className="absolute bottom-2 left-2 z-10">
            <StarRating rating={post?.stars!} />
          </div>
        </div>
      </Link>
      <CardHeader className="p-4">
        <Link href={`/posts/${post?.id}`} className="block">
          <h3 className="text-lg font-bold line-clamp-2 hover:text-primary transition-colors">{post.title}</h3>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/places/${post?.place.id}`} className="hover:text-primary transition-colors">
            {post?.place.name}
          </Link>
          <span>•</span>
          {/* <span>{formatDate(post.created_at)}</span> */}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground line-clamp-3">{post?.content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            {/* <AvatarImage src={post.author.avatarPath} alt={post.user.name} /> */}
            <AvatarFallback>{post?.user?.name.charAt(0).toUpperCase()}</AvatarFallback>

          </Avatar>
          <span className="text-sm">{post?.user?.name}</span>

        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-xs">{post?.likeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{post?.commentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

