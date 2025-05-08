"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Reply, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"

interface CommentSectionProps {
  postId: number
}

interface Comment {
  id: number
  content: string
  createdAt: string
  likes: number
  author: {
    id: number
    name: string
    avatarPath: string
  }
  replies?: Comment[]
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      content:
        "Vịnh Hạ Long thực sự là một kỳ quan thiên nhiên tuyệt vời! Tôi đã có cơ hội đến đó vào năm ngoái và trải nghiệm thật khó quên.",
      createdAt: "2025-03-16T10:30:00",
      likes: 12,
      author: {
        id: 2,
        name: "Trần Thị B",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
      replies: [
        {
          id: 3,
          content:
            "Bạn đã thử hoạt động chèo thuyền kayak chưa? Đó là trải nghiệm tuyệt vời nhất của tôi ở Vịnh Hạ Long.",
          createdAt: "2025-03-16T11:15:00",
          likes: 5,
          author: {
            id: 4,
            name: "Hoàng Văn D",
            avatarPath: "/placeholder.svg?height=40&width=40",
          },
        },
      ],
    },
    {
      id: 2,
      content:
        "Bài viết rất hay và chi tiết. Tôi đang lên kế hoạch cho chuyến đi tới Vịnh Hạ Long vào tháng tới, bạn có thể chia sẻ thêm về chi phí và thời điểm tốt nhất để đi không?",
      createdAt: "2025-03-17T09:45:00",
      likes: 8,
      author: {
        id: 3,
        name: "Lê Văn C",
        avatarPath: "/placeholder.svg?height=40&width=40",
      },
    },
  ])

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now(),
        content: commentText,
        createdAt: new Date().toISOString(),
        likes: 0,
        author: {
          id: 1,
          name: "Nguyễn Văn A",
          avatarPath: "/placeholder.svg?height=40&width=40",
        },
      }

      setComments([...comments, newComment])
      setCommentText("")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleLike = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }

        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return { ...reply, likes: reply.likes + 1 }
              }
              return reply
            }),
          }
        }

        return comment
      }),
    )
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">
        Bình luận ({comments.reduce((count, comment) => count + 1 + (comment.replies?.length || 0), 0)})
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
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={comment.author.avatarPath} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{comment.author.name}</h4>
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
                  <div className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</div>
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Thích ({comment.likes})</span>
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                    <Reply className="h-4 w-4" />
                    <span>Trả lời</span>
                  </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-6 mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.author.avatarPath} alt={reply.author.name} />
                          <AvatarFallback>{reply.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{reply.author.name}</h4>
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
                            <div className="text-xs text-muted-foreground">{formatDate(reply.createdAt)}</div>
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
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

