"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2 bg-muted/50 dark:bg-muted p-1 rounded-full">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full ${theme === "light" ? "bg-background text-foreground" : ""}`}
        onClick={() => setTheme("light")}
        aria-label="Light Mode"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full ${theme === "dark" ? "bg-background text-foreground" : ""}`}
        onClick={() => setTheme("dark")}
        aria-label="Dark Mode"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full ${theme === "system" ? "bg-background text-foreground" : ""}`}
        onClick={() => setTheme("system")}
        aria-label="System Mode"
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  )
}

