"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import Cookies from "js-cookie"
import { ACCESS_TOKEN_KEY } from "@/types/status"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [loginStatus, setLoginStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const { isLoading, error, message, handleLogin } = useAuth()

  useEffect(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
    if (accessToken) {
      router.replace("/")
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await handleLogin(formData.email, formData.password)
      if (response) {
        setLoginStatus({
          success: true,
          message: "Đăng nhập thành công! Chào mừng bạn.",
        })
        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        setLoginStatus({  
          success: false,
          message: error || "Email hoặc mật khẩu không chính xác.",
        })
      }
    } catch (error) {
      setLoginStatus({
        success: false,
        message: "Email hoặc mật khẩu không chính xác.",
      })
    }
    setTimeout(() => setLoginStatus(null), 3000)
  }

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
          <CardDescription className="text-center">
            Nhập thông tin đăng nhập của bạn để tiếp tục
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
            {loginStatus && (
              <p
                className={`text-sm text-center ${
                  loginStatus.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {loginStatus.message}
              </p>
            )}
            <div className="text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                Đăng ký ngay
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
