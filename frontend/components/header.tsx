"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { Menu, User, LogOut, Settings, MapPin, Search, Bell } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatarPath: "/placeholder.svg?height=32&width=32",
  })

  // Mock function to simulate logout
  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  // Mock function to simulate login (for demo purposes)
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <MapPin className="h-5 w-5" />
                  <span>TravelShare</span>
                </Link>
              </div>
              <div className="flex flex-col gap-3 mt-8 px-7">
                <Link href="/" className="text-lg font-medium">
                  Trang chủ
                </Link>
                <Link href="/posts" className="text-lg font-medium">
                  Khám phá
                </Link>
                <Link href="/categories" className="text-lg font-medium">
                  Danh mục
                </Link>
                <Link href="/chatbot" className="text-lg font-medium">
                  Chatbot AI
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/posts/create" className="text-lg font-medium">
                      Tạo bài viết
                    </Link>
                    <Link href="/profile" className="text-lg font-medium">
                      Trang cá nhân
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-lg font-medium">
                      Đăng nhập
                    </Link>
                    <Link href="/auth/register" className="text-lg font-medium">
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <MapPin className="h-5 w-5" />
            <span className="hidden md:inline">TravelShare</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Trang chủ
            </Link>
            <Link href="/posts" className="text-sm font-medium transition-colors hover:text-primary">
              Khám phá
            </Link>
            <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
              Danh mục
            </Link>
            <Link href="/chatbot" className="text-sm font-medium transition-colors hover:text-primary">
              Chatbot AI
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Tìm kiếm</span>
            </Link>
          </Button>

          <ThemeToggle />

          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                <span className="sr-only">Thông báo</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarPath} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Trang cá nhân</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/edit" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Cài đặt</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Đăng ký</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

