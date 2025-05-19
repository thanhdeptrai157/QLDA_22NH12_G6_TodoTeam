export interface CreateComment {
    user_id: number;
    post_id: number;
    content: string;
}
export interface Comment {
  id: number
  content: string
  created_at: string
  likes: number
  user: {
    id: number
    name: string
    avatar_path: string
  }
  like?: number[]
  likedByUser?: boolean
}