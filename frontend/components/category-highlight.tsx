import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface CategoryHighlightProps {
  category: {
    id: string
    name: string
    postCount: number
  }
}

const getCategoryBgClass = (id: string) => {
  const colors: Record<string, string> = {
    1: "bg-blue-500",
    2: "bg-green-500",
    3: "bg-purple-500",
    4: "bg-yellow-500",
    5: "bg-amber-800",
  }
  return colors[id] || "bg-primary"
}

const getCategoryLightClass = (id: string) => {
  const colors: Record<string, string> = {
    1: "bg-blue-100 text-blue-800",
    2: "bg-green-100 text-green-800",
    3: "bg-purple-100 text-purple-800",
    4: "bg-yellow-100 text-yellow-800",
    5: "bg-amber-100 text-amber-800",
  }
  return colors[id] || "bg-primary/10 text-primary"
}

const getCategoryBorderClass = (color: string) => {
  const colors: Record<string, string> = {
    1: "border-blue-200 hover:border-blue-500",
    2: "border-green-200 hover:border-green-500",
    3: "border-purple-200 hover:border-purple-500",
    4: "border-yellow-200 hover:border-yellow-500",
    5: "border-amber-200 hover:border-amber-800",
  }
  return colors[color] || "border-primary/20 hover:border-primary"
}

export function CategoryHighlight({ category }: CategoryHighlightProps) {
  return (
    <Link href={`/categories/${category.id}`} className="block hover-scale">
      <Card className={`overflow-hidden ${getCategoryBorderClass(category.id)} transition-all h-full`}>
        <div className={`h-2 ${getCategoryBgClass(category.id)}`}></div>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div
            className={`w-12 h-12 rounded-full ${getCategoryLightClass(category.id)} flex items-center justify-center mb-3`}
          >
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="font-bold mb-2">{category.name}</h3>
          <Badge variant="secondary">{category.postCount} bài viết</Badge>
        </CardContent>
      </Card>
    </Link>
  )
}

