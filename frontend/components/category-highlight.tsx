import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface CategoryHighlightProps {
  category: {
    name: string
    slug: string
    count: number
    color: string
  }
}

const getCategoryBgClass = (color: string) => {
  const colors: Record<string, string> = {
    beach: "bg-blue-500",
    mountain: "bg-green-500",
    city: "bg-purple-500",
    island: "bg-yellow-500",
    countryside: "bg-amber-800",
  }
  return colors[color] || "bg-primary"
}

const getCategoryLightClass = (color: string) => {
  const colors: Record<string, string> = {
    beach: "bg-blue-100 text-blue-800",
    mountain: "bg-green-100 text-green-800",
    city: "bg-purple-100 text-purple-800",
    island: "bg-yellow-100 text-yellow-800",
    countryside: "bg-amber-100 text-amber-800",
  }
  return colors[color] || "bg-primary/10 text-primary"
}

const getCategoryBorderClass = (color: string) => {
  const colors: Record<string, string> = {
    beach: "border-blue-200 hover:border-blue-500",
    mountain: "border-green-200 hover:border-green-500",
    city: "border-purple-200 hover:border-purple-500",
    island: "border-yellow-200 hover:border-yellow-500",
    countryside: "border-amber-200 hover:border-amber-800",
  }
  return colors[color] || "border-primary/20 hover:border-primary"
}

export function CategoryHighlight({ category }: CategoryHighlightProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="block hover-scale">
      <Card className={`overflow-hidden ${getCategoryBorderClass(category.color)} transition-all h-full`}>
        <div className={`h-2 ${getCategoryBgClass(category.color)}`}></div>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div
            className={`w-12 h-12 rounded-full ${getCategoryLightClass(category.color)} flex items-center justify-center mb-3`}
          >
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="font-bold mb-2">{category.name}</h3>
          <Badge variant="secondary">{category.count} bài viết</Badge>
        </CardContent>
      </Card>
    </Link>
  )
}

