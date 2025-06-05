"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  max?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onChange?: (rating: number) => void
}

export function StarRating({ rating, max = 5, size = "md", interactive = false, onChange }: StarRatingProps) {
  const sizeClass = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1)
    }
  }
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          className={`${sizeClass[size]} ${
            index < Math.floor(rating)
              ? "text-yellow-500 fill-yellow-500"
              : index < rating
                ? "text-yellow-500 fill-yellow-500 opacity-50"
                : "text-gray-300"
          } ${interactive ? "cursor-pointer" : ""}`}
          onClick={() => handleClick(index)}
        />
      ))}
      {rating > 0 && <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>}
    </div>
  )
}

