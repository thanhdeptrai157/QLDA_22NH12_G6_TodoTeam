export interface Post {
  id?: number;
  user: {
    id: number;
    name: string;
    email: string;
  },
  place_id: string | null;
  stars: number | null;
  category_id?: number | null;
  title: string;
  content: string;
  likes: number;
  image: string[];
  created_at: string;
  updated_at: string;
  status: boolean;
  place: {
    id: string;
    name: string;
    address: string;
  },
  category: {
    id: number;
    name: string;
  },
  like: {
    id: number;
    user_id: number;
    post_id: number;
  }[];
  likedByUser: boolean;
  commentCount?: number;
}

export interface CreatePostPayload {
  user_id: number;
  place_id: string | null;
  stars: number | null;
  category_id: number | null;
  title: string;
  content: string;
  images?: string[];
  // for place details
  place_name: string;
  place_address: string;

}


export interface Category {
  id: number;
  name: string;
}