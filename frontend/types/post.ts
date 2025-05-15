export interface Post {
  id?: number;
  user_id: number;
  place_id: string | null;
  stars: number | null;
  category_id?: number | null;
  title: string;
  content: string;
  likes: number;
  image?: string | null;
  created_at: string; 
  updated_at: string; 
  status: boolean;
}
