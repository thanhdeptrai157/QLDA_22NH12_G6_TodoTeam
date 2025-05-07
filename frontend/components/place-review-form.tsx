"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/star-rating"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PlaceReviewFormProps {
  placeId: number
}

export function PlaceReviewForm({ placeId }: PlaceReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Đánh giá không hợp lệ",
        description: "Vui lòng đánh giá địa điểm từ 1-5 sao",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Gửi đánh giá thành công",
        description: "Cảm ơn bạn đã chia sẻ đánh giá về địa điểm này!",
      })

      setRating(0)
      setContent("")
    } catch (error) {
      toast({
        title: "Gửi đánh giá thất bại",
        description: "Có lỗi xảy ra khi gửi đánh giá",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Đánh giá của bạn</label>
              <StarRating rating={rating} interactive={true} onChange={handleRatingChange} />
            </div>
            <Textarea
              placeholder="Chia sẻ trải nghiệm của bạn về địa điểm này..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-3 resize-none"
              rows={3}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

