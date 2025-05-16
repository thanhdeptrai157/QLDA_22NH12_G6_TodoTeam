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

export interface CreatePostPayload {
  user_id: number;
  place_id: string | null;
  stars: number | null;
  category_id: number | null;
  title: string;
  content: string;
  image?: string | null;
  // for place details
  place_name: string;
  place_address: string;

}


export interface Category {
  id: number;
  name: string;
}