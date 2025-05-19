import { postService } from "@/service/post-service"
import { PageClient } from "./page-client"

interface PostPageProps {
  params: { id: string }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await postService.getDetailPost(Number(params.id))
  return <PageClient post={post} />
}
