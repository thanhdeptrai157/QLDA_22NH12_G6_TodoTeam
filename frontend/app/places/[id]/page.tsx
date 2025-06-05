import type React from "react"
import { PlaceClient } from "@/components/place-client"

interface PlacePageProps {
  params: {
    id: string
  }
}

export default function PlacePage({ params }: PlacePageProps) {
  const { id } = params
  return (
    <PlaceClient id={Number.parseInt(id)} />
  )
}
