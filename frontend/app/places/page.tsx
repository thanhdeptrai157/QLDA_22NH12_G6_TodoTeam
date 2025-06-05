"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Search } from "lucide-react"

import { usePlace } from "@/hooks/use-place"
import { useEffect } from "react"

const PlacesPage = () => {
  const {places, isLoading, error, fetchAllPlaces} = usePlace()
  // Fetch all places when the component mounts
  useEffect(() => {
    fetchAllPlaces()
  }, [])
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Tất cả địa điểm</h1>
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Tìm kiếm địa điểm..."
          className="pl-9 py-2 w-full border rounded bg-white/20 border-white/30 placeholder:text-white/70 text-white"
        />
      </div>
      {isLoading  ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="h-48 bg-gray-300 rounded w-full mb-2" />
              <div className="h-6 bg-gray-300 rounded w-2/3 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places && places.map((place) => (
            <Link key={place.id} href={`/places/${place.id}`} className="block group">
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={place.images && place.images.length > 0 ? place.images[0] : "/placeholder.svg"}
                    alt={place.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white">{place.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">{place.address}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{place.address}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
export default PlacesPage