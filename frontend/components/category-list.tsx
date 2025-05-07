import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CategoryListProps {
  categories: {
    name: string
    count: number
  }[]
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`} className="block">
          <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <h3 className="font-bold mb-2">{category.name}</h3>
              <Badge variant="secondary">{category.count} bài viết</Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

