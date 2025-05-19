"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Reply, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"
import { useAuthStore } from "@/store/user"
import { useRouter, useSearchParams } from "next/navigation"
import { commentService } from "@/service/comment-service"
import { useComment } from "@/hooks/useComment"
import { Comment } from "@/types/comment"
import { likeService } from "@/service/like-service"
interface CommentSectionProps {
  postId: number
}

export function CommentSection({ postId }: CommentSectionProps) {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const { isLoading, error, getComments } = useComment()

  const [commentText, setCommentText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [comments, setComments] = useState<Comment[]>([])
 useEffect(() => {
  const fetchComments = async () => {
    try {
      const comments = await getComments(postId);
      const updatedComments = comments.map((comment: Comment) => ({
  ...comment,
  likedByUser: Array.isArray(comment.like) && comment.like.some((like: any) => like.user_id === Number(user?.id)),
}));
      console.log("Updated comments:", updatedComments);
      setComments(updatedComments);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  fetchComments();
}, [postId, user]);


  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return

    setIsSubmitting(true)

    // Simulate API call

    const response = await commentService.createComment(
      {
        user_id: Number(user?.id),
        post_id: postId,
        content: commentText,
      }
    )
    const newComment = response.comment

    //   Comment = {
    //   id: Date.now(),
    //   content: commentText,
    //   createdAt: new Date().toISOString(),
    //   likes: 0,
    //   author: {
    //     id: 1,
    //     name: "Nguyễn Văn A",
    //     avatarPath: "/placeholder.svg?height=40&width=40",
    //   }
    // }
    setComments([...comments!, newComment])
    setCommentText("")
    setIsSubmitting(false)

  }

  const handleLike = (commentId: number) => {
  if (!user) {
    router.push("/login");
    return;
  }

  const comment = comments!.find((comment) => comment.id === commentId);

  if (!comment) return;

  const hasLiked = comment.likedByUser; // Kiểm tra trạng thái like của người dùng

  if (hasLiked) {
    // Nếu đã like, thực hiện dislike
    likeService.deleteLike({ is_post: false, user_id: Number(user?.id), target_id: commentId });
    setComments(
      comments!.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes - 1, likedByUser: false };
        }
        return comment;
      })
    );
  } else {
    // Nếu chưa like, thực hiện like
    likeService.createLike({ is_post: false, user_id: Number(user?.id), target_id: commentId });
    setComments(
      comments!.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1, likedByUser: true };
        }
        return comment;
      })
    );
  }
};

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">
        Bình luận ({comments.length})
      </h3>

      <div className="flex gap-3 mb-6">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <Textarea
            placeholder="Viết bình luận của bạn..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="mb-2 resize-none"
            rows={3}
          />
          <Button onClick={handleCommentSubmit} disabled={!commentText.trim() || isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {comments!.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={comment.user?.avatar_path} alt={comment?.user?.name} />
                <AvatarFallback>{comment?.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{comment?.user?.name}</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="my-2">{comment.content}</p>
                  <div className="text-xs text-muted-foreground">{formatDate(comment?.created_at)}</div>
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    className={`text-sm flex items-center gap-1 ${
                      comment.likedByUser ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likedByUser ? "Bỏ thích" : "Thích"} ({comment.likes})</span>
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                    <Reply className="h-4 w-4" />
                    <span>Trả lời</span>
                  </button>
                </div>

                {/* Replies */}
                {/* {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-6 mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.user?.avatar_path} alt={reply.user.name} />
                          <AvatarFallback>{reply.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{reply.user.name}</h4>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="my-2">{reply.content}</p>
                            <div className="text-xs text-muted-foreground">{formatDate(reply.created_at)}</div>
                          </div>
                          <div className="flex gap-4 mt-2">
                            <button
                              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                              onClick={() => handleLike(reply.id)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>Thích ({reply.likes})</span>
                            </button>
                            <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                              <Reply className="h-4 w-4" />
                              <span>Trả lời</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

