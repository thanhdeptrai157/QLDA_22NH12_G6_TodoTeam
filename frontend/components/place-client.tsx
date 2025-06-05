"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useState } from "react"

import { PostCard } from "@/components/post-card"
import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import {
    MapPin,
    Navigation,
    Clock,
    Users,
    Camera,
    ThumbsUp,
    MessageSquare,
    Share2,
    ChevronLeft,
    Sun,
} from "lucide-react"
import { PlaceReviewForm } from "@/components/place-review-form"
import { usePlace } from "@/hooks/use-place"
import { useEffect } from "react"
import { useWeather } from "@/hooks/use-weather";
import { changeKelvinToCelsius } from "@/lib/utils";
import { weatherMainToVietnamese } from "@/constants/weather-map";
import MyMap from "./map";
;

export const PlaceClient = ({ id }: { id: number }) => {
    const { data, isLoading, error, fetchPlaceById } = usePlace();
    const [modalImageIndex, setModalImageIndex] = useState<number | null>(null)

    useEffect(() => {
        fetchPlaceById(id)
    }, [id])
    const relatedPosts = data?.posts
    const img = relatedPosts?.[0].image
    const latitude = data?.latitude || 0;
    const longitude = data?.longitude || 0;
    const { weather, isWeatherLoading, errorFetchingWeather } = useWeather(latitude, longitude);
    console.log(weather)
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
    if(isLoading){
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="h-10 w-2/3 bg-gray-200 rounded mb-4" />
                        <div className="h-6 w-1/3 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-1/4 bg-gray-100 rounded mb-6" />
                        <div className="h-80 w-full bg-gray-200 rounded mb-6" />
                        <div className="h-32 w-full bg-gray-100 rounded mb-8" />
                        <div className="h-64 w-full bg-gray-200 rounded mb-8" />
                        <div className="space-y-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="h-24 w-full bg-gray-100 rounded" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-64 w-full bg-gray-200 rounded mb-6" />
                        <div className="h-64 w-full bg-gray-100 rounded" />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Modal xem ảnh lớn */}
            {img && typeof modalImageIndex === 'number' && img[modalImageIndex] && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300"
                    onClick={() => setModalImageIndex(null)}
                >
                    <div
                        className="relative max-w-5xl w-full mx-4 flex items-center justify-center"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Image counter */}
                        <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm">
                            {modalImageIndex + 1} / {img.length}
                        </div>
                        {/* Previous button */}
                        {modalImageIndex > 0 && (
                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-all duration-200 backdrop-blur-sm hover:scale-110 group"
                                onClick={() => setModalImageIndex((idx) => (typeof idx === 'number' && idx > 0 ? idx - 1 : idx))}
                            >
                                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                        )}
                        {/* Next button */}
                        {modalImageIndex < img.length - 1 && (
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-all duration-200 backdrop-blur-sm hover:scale-110 group"
                                onClick={() => setModalImageIndex((idx) => (typeof idx === 'number' && idx < img.length - 1 ? idx + 1 : idx))}
                            >
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        )}
                        {/* Main image */}
                        <div className="relative w-full h-[80vh] flex items-center justify-center">
                            <Image
                                src={img[modalImageIndex] || "/placeholder.svg"}
                                alt="Zoomed"
                                width={1200}
                                height={800}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-300"
                                priority
                            />
                        </div>
                        {/* Thumbnail navigation */}
                        {img.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-3 rounded-full backdrop-blur-sm">
                                {img.slice(0, 5).map((im, index) => (
                                    <button
                                        key={index}
                                        className={`relative w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${index === modalImageIndex ? "ring-2 ring-white scale-110" : "hover:scale-105 opacity-70 hover:opacity-100"}`}
                                        onClick={() => setModalImageIndex(index)}
                                    >
                                        <Image src={im || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                                {img.length > 5 && (
                                    <div className="flex items-center justify-center w-12 h-12 bg-black/50 rounded-lg text-white text-xs">
                                        +{img.length - 5}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <Button variant="ghost" className="mb-4" asChild>
                <Link href="/places">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    <span>Quay lại</span>
                </Link>
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {/* Place Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            {/* <Badge className={`${getCategoryColor(place.category.slug)} hover:opacity-90`}>
                                {place.category.name}
                            </Badge> */}
                            
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{data?.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <StarRating rating={data?.average_stars!} />
                            <span className="text-muted-foreground">({data?.postCount} đánh giá)</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{data?.address}</span>
                        </div>
                    </div>

                    {/* Place Images */}
                    {img && img.length > 0 && (
                        <div className="grid gap-2 mb-6"
                            style={{
                                gridTemplateColumns:
                                    img.length === 1
                                        ? '1fr'
                                        : img.length === 2
                                        ? '1fr 1fr'
                                        : img.length === 3
                                        ? '2fr 1fr'
                                        : img.length === 4
                                        ? '2fr 1fr'
                                        : '2fr 1fr 1fr',
                                gridTemplateRows:
                                    img.length === 1
                                        ? '1fr'
                                        : img.length === 2
                                        ? '1fr'
                                        : img.length === 3
                                        ? '1fr 1fr'
                                        : img.length === 4
                                        ? '1fr 1fr'
                                        : '1fr 1fr',
                            }}
                        >
                            {/* 1 image */}
                            {img.length === 1 && (
                                <div className="relative h-80 cursor-zoom-in group overflow-hidden rounded-lg col-span-full row-span-full"
                                    onClick={() => setModalImageIndex(0)}>
                                    <Image
                                        src={img[0] || "/placeholder.svg"}
                                        alt={data?.name || "Place Image"}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            {/* 2 images */}
                            {img.length === 2 && (
                                <>
                                    {[0, 1].map((idx) => (
                                        <div
                                            key={idx}
                                            className="relative h-80 cursor-zoom-in group overflow-hidden rounded-lg"
                                            onClick={() => setModalImageIndex(idx)}
                                        >
                                            <Image
                                                src={img[idx] || "/placeholder.svg"}
                                                alt={data?.name || "Place Image"}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                            {/* 3 images */}
                            {img.length === 3 && (
                                <>
                                    <div
                                        className="relative h-80 md:row-span-2 cursor-zoom-in group overflow-hidden rounded-lg"
                                        style={{ gridColumn: '1', gridRow: '1 / span 2' }}
                                        onClick={() => setModalImageIndex(0)}
                                    >
                                        <Image
                                            src={img[0] || "/placeholder.svg"}
                                            alt={data?.name || "Place Image"}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    {[1, 2].map((idx, i) => (
                                        <div
                                            key={idx}
                                            className="relative h-40 cursor-zoom-in group overflow-hidden rounded-lg"
                                            style={{ gridColumn: '2', gridRow: `${i + 1}` }}
                                            onClick={() => setModalImageIndex(idx)}
                                        >
                                            <Image
                                                src={img[idx] || "/placeholder.svg"}
                                                alt={data?.name || "Place Image"}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                            {/* 4 images */}
                            {img.length === 4 && (
                                <>
                                    <div
                                        className="relative h-80 md:row-span-2 cursor-zoom-in group overflow-hidden rounded-lg"
                                        style={{ gridColumn: '1', gridRow: '1 / span 2' }}
                                        onClick={() => setModalImageIndex(0)}
                                    >
                                        <Image
                                            src={img[0] || "/placeholder.svg"}
                                            alt={data?.name || "Place Image"}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    {[1, 2, 3].map((idx, i) => (
                                        <div
                                            key={idx}
                                            className="relative h-40 cursor-zoom-in group overflow-hidden rounded-lg"
                                            style={{ gridColumn: '2', gridRow: `${i + 1}` }}
                                            onClick={() => setModalImageIndex(idx)}
                                        >
                                            <Image
                                                src={img[idx] || "/placeholder.svg"}
                                                alt={data?.name || "Place Image"}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                            {/* 5 or more images */}
                            {img.length >= 5 && (
                                <>
                                    <div
                                        className="relative h-80 md:row-span-2 cursor-zoom-in group overflow-hidden rounded-lg"
                                        style={{ gridColumn: '1', gridRow: '1 / span 2' }}
                                        onClick={() => setModalImageIndex(0)}
                                    >
                                        <Image
                                            src={img[0] || "/placeholder.svg"}
                                            alt={data?.name || "Place Image"}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    {[1, 2, 3].map((idx, i) => (
                                        <div
                                            key={idx}
                                            className="relative h-40 cursor-zoom-in group overflow-hidden rounded-lg"
                                            style={{ gridColumn: '2', gridRow: `${i + 1}` }}
                                            onClick={() => setModalImageIndex(idx)}
                                        >
                                            <Image
                                                src={img[idx] || "/placeholder.svg"}
                                                alt={data?.name || "Place Image"}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                    <div
                                        className="relative h-40 cursor-zoom-in group overflow-hidden rounded-lg"
                                        style={{ gridColumn: '3', gridRow: '1' }}
                                        onClick={() => setModalImageIndex(4)}
                                    >
                                        <Image
                                            src={img[4] || "/placeholder.svg"}
                                            alt={data?.name || "Place Image"}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {img.length > 5 && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                                                <span className="text-white text-xl font-bold">+{img.length - 5}</span>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Place Description */}
                    <div className="mb-8">
                        {/* <h2 className="text-2xl font-bold mb-4">Giới thiệu</h2> */}
                        {/* <p className="text-muted-foreground mb-6">{place.description}</p> */}
{/* 
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card>
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <Clock className="h-8 w-8 text-primary mb-2" />
                                    <h3 className="font-medium">Giờ mở cửa</h3>
                                    <p className="text-sm text-muted-foreground">{place.openHours}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <Calendar className="h-8 w-8 text-primary mb-2" />
                                    <h3 className="font-medium">Thời điểm lý tưởng</h3>
                                    <p className="text-sm text-muted-foreground">{place.bestTimeToVisit}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <Ticket className="h-8 w-8 text-primary mb-2" />
                                    <h3 className="font-medium">Giá vé</h3>
                                    <p className="text-sm text-muted-foreground">{place.entranceFee}</p>
                                </CardContent>
                            </Card>
                        </div> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* <div>
                                <h3 className="text-xl font-bold mb-3">Tiện ích</h3>
                                <ul className="grid grid-cols-2 gap-2">
                                    {place.amenities.map((amenity, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                            <span>{amenity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                            <div >
                                <h3 className="text-xl font-bold mb-3 ">Thống kê</h3>
                                <div className=" grid grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <Camera className="h-5 w-5 text-primary" />
                                        <span>{relatedPosts?.length} bài viết</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="h-5 w-5 text-primary" />
                                        <span>{data?.postCount} đánh giá</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Vị trí</h2>
                        <MyMap lat={data?.latitude!} lng={data?.longitude!} />
                    </div>

                    {/* Related Posts */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Bài viết về {data?.name}</h2>
                            <Button variant="outline" asChild>
                                {/* <Link href={`/posts/create?place=${data?.id}`}>
                                    <Camera className="h-4 w-4 mr-2" />
                                    Chia sẻ trải nghiệm
                                </Link> */}
                            </Button>
                        </div>
                        <div className="space-y-6">
                            {relatedPosts?.map((post) => (
                                <PostCard key={post.id} post={post} layout="horizontal" />
                            ))}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div>
                        {/* <h2 className="text-2xl font-bold mb-6">Đánh giá từ cộng đồng</h2> */}

                        {/* <div className="mb-8">
                            <PlaceReviewForm placeId={data?.id} />
                        </div> */}

                        {/* <div className="space-y-6">
                            {reviews.map((review) => (
                                <Card key={review.id}>
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            <Avatar>
                                                <AvatarImage src={review.author.avatarPath} alt={review.author.name} />
                                                <AvatarFallback>{review.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-medium">{review.author.name}</h3>
                                                    <StarRating rating={review.rating} />
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {new Date(review.createdAt).toLocaleDateString("vi-VN", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                                <p>{review.content}</p>
                                                <div className="flex gap-4 mt-4">
                                                    <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                                                        <ThumbsUp className="h-4 w-4" />
                                                        <span>Hữu ích</span>
                                                    </button>
                                                    <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                                                        <MessageSquare className="h-4 w-4" />
                                                        <span>Bình luận</span>
                                                    </button>
                                                    <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                                                        <Share2 className="h-4 w-4" />
                                                        <span>Chia sẻ</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div> */}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="sticky top-20">
                    
                        <Card className="mb-6">
                            <CardContent className="p-4">
                                <h2 className="text-xl font-bold mb-4">Địa điểm lân cận</h2>
                                <div className="space-y-3">
                                    <Link href="/places/2" className="flex items-start gap-3 group">
                                        <div className="relative h-16 w-16 flex-shrink-0">
                                            <Image
                                                src="/placeholder.svg?height=100&width=100"
                                                alt="Hang Sửng Sốt"
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium group-hover:text-primary transition-colors">Hang Sửng Sốt</h3>
                                            <p className="text-sm text-muted-foreground">Cách 2.5 km</p>
                                            <StarRating rating={4.7} size="sm" />
                                        </div>
                                    </Link>
                                    <Link href="/places/3" className="flex items-start gap-3 group">
                                        <div className="relative h-16 w-16 flex-shrink-0">
                                            <Image
                                                src="/placeholder.svg?height=100&width=100"
                                                alt="Đảo Ti Tốp"
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium group-hover:text-primary transition-colors">Đảo Ti Tốp</h3>
                                            <p className="text-sm text-muted-foreground">Cách 3.8 km</p>
                                            <StarRating rating={4.5} size="sm" />
                                        </div>
                                    </Link>
                                    <Link href="/places/4" className="flex items-start gap-3 group">
                                        <div className="relative h-16 w-16 flex-shrink-0">
                                            <Image
                                                src="/placeholder.svg?height=100&width=100"
                                                alt="Hang Luồn"
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium group-hover:text-primary transition-colors">Hang Luồn</h3>
                                            <p className="text-sm text-muted-foreground">Cách 5.2 km</p>
                                            <StarRating rating={4.6} size="sm" />
                                        </div>
                                    </Link>
                                </div>
                                <Button variant="ghost" className="w-full mt-4" asChild>
                                    <Link href="/places">Xem thêm</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <h2 className="text-xl font-bold mb-4">Thời tiết</h2>
                                {isWeatherLoading ? (
                                    <div className="animate-pulse text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
                                        </div>
                                        <div className="h-8 w-24 bg-gray-200 rounded mx-auto mb-2" />
                                        <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-4" />
                                        <div className="grid grid-cols-3 gap-2 mt-4">
                                            <div className="space-y-2">
                                                <div className="h-4 w-12 bg-gray-200 rounded mx-auto" />
                                                <div className="h-4 w-8 bg-gray-200 rounded mx-auto" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-12 bg-gray-200 rounded mx-auto" />
                                                <div className="h-4 w-8 bg-gray-200 rounded mx-auto" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-12 bg-gray-200 rounded mx-auto" />
                                                <div className="h-4 w-8 bg-gray-200 rounded mx-auto" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} alt="Weather icon" />
                                        </div>
                                        <p className="text-3xl font-bold mb-1">{weather?.main.temp!}°C</p>
                                        <p className="text-muted-foreground">{data?.name}, Việt Nam</p>
                                        <div className="grid grid-cols-3 gap-2 mt-4">
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground">Độ ẩm</p>
                                                <p className="font-medium">{weather?.main.humidity}%</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground">Gió</p>
                                                <p className="font-medium">{weather?.wind.speed} km/h</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground">Kiểu thời tiết</p>
                                                <p className="font-medium">{weatherMainToVietnamese[weather?.weather[0]?.main!]}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Componentes adicionales necesarios
function Avatar({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`relative rounded-full overflow-hidden ${className || ""}`}>{children}</div>
}

function AvatarImage({ src, alt }: { src: string; alt: string }) {
    return <Image src={src || "/placeholder.svg"} alt={alt} width={40} height={40} className="object-cover" />
}

function AvatarFallback({ children }: { children: React.ReactNode }) {
    return <div className="flex items-center justify-center bg-muted h-full w-full">{children}</div>
}

function Calendar(props: any) {
    return <Clock {...props} />
}

function Ticket(props: any) {
    return <div {...props}>🎫</div>
}

