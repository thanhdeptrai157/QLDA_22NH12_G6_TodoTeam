import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ChatWidget } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TravelShare - Chia sẻ trải nghiệm du lịch",
  description: "Nền tảng chia sẻ trải nghiệm du lịch và đánh giá địa điểm",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

