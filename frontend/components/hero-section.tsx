"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Camera, Star, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { usePost } from "@/hooks/usePost"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<any[]>([])
  const { getTopPostsByLikes } = usePost()

  useEffect(() => {
    const fetchSlides = async () => {
      const posts = await getTopPostsByLikes(3)
      if (posts && posts.length > 0) {
        setSlides(
          posts.map((post: any) => ({
            image: post.image?.[0] || "/placeholder.svg?height=600&width=1600",
            color: "from-blue-600/40 to-purple-600/40", 
            title: post?.title,
            description: post.content?.slice(0, 100) + (post.content?.length > 100 ? "..." : ""),
            link: `/posts/${post.id}`,
          }))
        )
      } else {
        setSlides([])
      }
    }
    fetchSlides()
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (slides.length > 0 ? (prev + 1) % slides.length : 0))
  }, [slides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (slides.length > 0 ? (prev === 0 ? slides.length - 1 : prev - 1) : 0))
  }, [slides])

  useEffect(() => {
    if (slides.length === 0) return
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide, slides])

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white h-[600px] md:h-[700px]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50 z-20"></div>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} z-10`}></div>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <div className="mb-6 transition-all duration-500 transform translate-y-0 opacity-100">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {slides[currentSlide]?.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">{slides[currentSlide]?.description}</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href={slides[currentSlide]?.link || "/"}>
                  <MapPin className="mr-2 h-5 w-5" />
                  Khám phá ngay
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                <Link href="/posts/create">
                  <Camera className="mr-2 h-5 w-5" />
                  Chia sẻ trải nghiệm
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold">1000+ Địa điểm</h3>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Camera className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold">5000+ Bài viết</h3>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold">10000+ Đánh giá</h3>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold">3000+ Thành viên</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  )
}

