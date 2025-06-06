"use client";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { StarRating } from "@/components/star-rating"
import { MapPin, TrendingUp, Clock, Award, Compass, Users } from "lucide-react"
import { usePlace } from "@/hooks/use-place"
import { PlaceExplore } from "@/types/place"
import { useEffect, useState } from "react";
import { usePost } from "@/hooks/use-post";
import { useTopCategories } from "@/hooks/use-category";

export default function ExplorePage() {
  const { getTopPostsByLikes} = usePost();
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
   useEffect(() => {
    const fetchTopPosts = async () => {
      const posts = await getTopPostsByLikes(2);
      setFeaturedPosts(posts || []);
    };
    fetchTopPosts();
   }, []);
  
  const { categories, isLoading: isCategoryLoading } = useTopCategories()
  // Mock trending places
  const {
    placeTrending: trendingPlaces, 
    isLoading: isTrendingLoading, 
    error: trendingError, 
    fetchPlaceTrending
  } = usePlace()

  const {
    placeRecent: recentPlaces, 
    isLoading: isRecentLoading, 
    error: recentError, 
    fetchPlaceRecent
  } = usePlace()

  const {
   placeTopRated: topRatedPlaces,
   isLoading: isTopRatedLoading,
   error: topRatedError,
   fetchPlaceTopRated
  } = usePlace()
  
  const {
    placePopular: popularPlaces,
    isLoading: isPopularLoading,
    error: popularError,
    fetchPlacePopular
  } = usePlace()
  // Fetch trending, recent, and top-rated places
  useEffect(() => {
    fetchPlaceTrending()
  }, [])

  useEffect(() => {
    fetchPlaceRecent()
  }, [])
  useEffect(() => {
    fetchPlaceTopRated()
  }, [])
  useEffect(() => {
    fetchPlacePopular()
  }, [])
  // ✅ Combine loading states
  const isLoading = isTrendingLoading || isRecentLoading || isTopRatedLoading || isPopularLoading
  const hasError = trendingError || recentError || topRatedError || popularError
  
  
  
    
    

  
const gradientColors = [
  "from-blue-500 to-blue-700",
  "from-green-500 to-green-700", 
  "from-purple-500 to-purple-700",
  "from-red-500 to-red-700",
  "from-yellow-500 to-yellow-700",
  "from-pink-500 to-pink-700",
  "from-indigo-500 to-indigo-700",
  "from-orange-500 to-orange-700",
  "from-teal-500 to-teal-700",
  "from-cyan-500 to-cyan-700"
]
const getRandomColorByIndex = (index: number) => {
  return gradientColors[index % gradientColors.length]
   
}
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Khám phá Việt Nam</h1>
        <p className="max-w-2xl mb-6">
          Tìm kiếm những địa điểm du lịch thú vị, hoạt động hấp dẫn và trải nghiệm độc đáo trên khắp Việt Nam.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link href="/places">
              <MapPin className="mr-2 h-5 w-5" />
              Địa điểm
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
            <Link href="/provinces">
              <Compass className="mr-2 h-5 w-5" />
              Tỉnh thành
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trending" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Xu hướng</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mới nhất</span>
          </TabsTrigger>
          <TabsTrigger value="top-rated" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Đánh giá cao</span>
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Phổ biến</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Địa điểm nổi bật</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trendingPlaces.map((place: PlaceExplore) => (
                  <Link key={place.id} href={`/places/${place.id}`} className="block group">
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-2 right-2">
                          <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            Trending
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white">{place.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-white/80 text-sm">{place.address}</span>
                            <StarRating rating={place.rating} size="sm" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/places">Xem thêm địa điểm</Link>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Bài viết nổi bật</h2>
              <div className="space-y-4">
                {featuredPosts.map((post) => (
                  <PostCard key={post.id} post={post} layout="horizontal" />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/posts">Xem thêm bài viết</Link>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent">
              <h2 className="text-2xl font-bold mb-6">Địa điểm mới</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPlaces.map((place) => (
                  <Link key={place.id} href={`/places/${place.id}`} className="block group">
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-2 right-2">
                          <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            Mới
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white">{place.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-white/80 text-sm">{place.address}</span>
                            <StarRating rating={place.rating} size="sm" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
        </TabsContent>

        <TabsContent value="top-rated">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRatedPlaces.map((place: PlaceExplore) => (
                <Link key={place.id} href={`/places/${place.id}`} className="block group">
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute top-2 right-2">
                        <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          Top Rated
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white">{place.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">{place.address}</span>
                          <div className="flex items-center">
                            <StarRating rating={place.rating} size="sm" />
                            <span className="text-white/80 text-xs ml-1">({place.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{place.address}</span>
                        </div>
                        <div className="bg-gradient-to-r text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                          <span className="text-black">{place.rating}</span>
                          <span className="text-yellow-300">★</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="popular">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularPlaces.map((place) => (
                <Link key={place.id} href={`/places/${place.id}`} className="block group">
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute top-2 right-2">
                        <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          Popular
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white">{place.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">{place.address}</span>
                          <div className="flex items-center">
                            <StarRating rating={place.rating} size="sm" />
                            <span className="text-white/80 text-xs ml-1">({place.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{place.address}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{place.reviewCount} đánh giá</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Destinations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Điểm đến nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`bg-gradient-to-r ${getRandomColorByIndex(index)} text-white p-6`}>
                <h3 className="text-xl font-bold mb-2">
                  {category.name}
                </h3>
                <p className="mb-4 text-white/90">
                  {category.description}
                </p>
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
                  <Link href={`/categories/${category.id}`}>Khám phá</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

