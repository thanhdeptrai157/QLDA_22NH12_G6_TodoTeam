"use client"

import type React from "react"
import { useState, useEffect } from "react" // Thêm useEffect
import { useRouter, useSearchParams } from "next/navigation" // Thêm useSearchParams
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useCategory } from "@/hooks/useCategory" // Giả sử bạn có hook này để lấy danh sách categories

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams() // Để đọc query params hiện tại (nếu cần thiết lập giá trị ban đầu)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("all") // Sẽ lưu ID của category

  // Sử dụng hook để lấy danh sách categories từ API
  // const { categories, isLoading: isLoadingCategories } = useCategory(); // Giả sử hook này trả về { id: number, name: string }[]

  // Hardcode categories để test nếu chưa có hook
  const categories = [
    { id: 1, name: "Biển" },
    { id: 2, name: "Núi" },
    { id: 3, name: "Thành phố" },
    { id: 4, name: "Đảo" },
    { id: 5, name: "Làng quê" },
    // Thêm các category khác từ API của bạn
  ];
  const isLoadingCategories = false;


  // Thiết lập giá trị ban đầu từ URL khi component mount (nếu người dùng F5 hoặc vào từ link)
  useEffect(() => {
    const q = searchParams.get("keyword") || searchParams.get("locationName") || ""
    const catId = searchParams.get("category_id") || "all"
    setSearchTerm(q)
    setSelectedCategoryId(catId)
  }, [searchParams])


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()

    if (searchTerm.trim()) {
      // Bạn có thể quyết định searchTerm này là 'keyword' (cho title/content)
      // hay 'locationName' (cho tên địa điểm).
      // Hoặc, trang /search sẽ quyết định dựa trên ngữ cảnh.
      // Ở đây, chúng ta giả sử nó là một từ khóa chung.
      queryParams.set("keyword", searchTerm.trim())
      // Nếu bạn muốn SearchBar này CỤ THỂ chỉ tìm theo locationName, thì:
      // queryParams.set("locationName", searchTerm.trim());
    }

    if (selectedCategoryId && selectedCategoryId !== "all") {
      queryParams.set("category_id", selectedCategoryId)
    }

    router.push(`/search?${queryParams.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Tìm địa điểm, bài viết..." // Đổi placeholder cho phù hợp
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId} disabled={isLoadingCategories}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Danh mục" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả danh mục</SelectItem>
          {categories.map((cat) => (
            // Quan trọng: value của SelectItem phải là ID của category (dạng chuỗi)
            <SelectItem key={cat.id} value={String(cat.id)}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Tìm kiếm</Button>
    </form>
  )
}