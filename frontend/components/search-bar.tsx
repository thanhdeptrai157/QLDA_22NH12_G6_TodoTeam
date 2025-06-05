"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [locationName, setLocationName] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("all")
  const [selectedStars, setSelectedStars] = useState("all")

  const categories = [
    { id: 1, name: "Biển" },
    { id: 2, name: "Núi" },
    { id: 3, name: "Thành phố" },
    { id: 4, name: "Đảo" },
    { id: 5, name: "Làng quê" },
  ];
  const isLoadingCategories = false;

  useEffect(() => {
    const loc = searchParams.get("locationName") || ""
    const catId = searchParams.get("category_id") || "all"
    const stars = searchParams.get("stars") || "all"
    setLocationName(loc)
    setSelectedCategoryId(catId)
    setSelectedStars(stars)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()

    if (locationName.trim()) {
      queryParams.set("locationName", locationName.trim())
    }
    if (selectedCategoryId && selectedCategoryId !== "all") {
      queryParams.set("category_id", selectedCategoryId)
    }
    if (selectedStars && selectedStars !== "all") {
      queryParams.set("stars", selectedStars)
    }

    router.push(`/search?${queryParams.toString()}`)
  }

  const isShowAll = !locationName.trim() && selectedCategoryId === "all" && selectedStars === "all"

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Tìm địa điểm..."
          className="pl-9"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
      </div>
      <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId} disabled={isLoadingCategories}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Danh mục" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả danh mục</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={String(cat.id)}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedStars} onValueChange={setSelectedStars}>
        <SelectTrigger className="w-full sm:w-[120px]">
          <SelectValue placeholder="Số sao" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả sao</SelectItem>
          {[1, 2, 3, 4, 5].map((star) => (
            <SelectItem key={star} value={String(star)}>
              {star} sao
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">
        {isShowAll ? "Hiển thị tất cả" : "Tìm kiếm"}
      </Button>
    </form>
  )
}