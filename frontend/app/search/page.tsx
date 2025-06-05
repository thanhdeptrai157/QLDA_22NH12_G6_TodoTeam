"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import api from "@/configs/axios";

// --- BẮT ĐẦU ĐỊNH NGHĨA INTERFACE ---
interface User {
  id: number;
  name: string;
  email: string;
}

interface CategoryInfo {
  id: number;
  name: string;
}

interface PlaceInfo {
  id: string;
  name: string;
  address: string;
}

interface LikeInfo {
  user_id: number;
}

// Interface Post cục bộ, bao gồm likedByUser
interface Post {
  id: number;
  user_id: number;
  place_id: string;
  stars: number;
  category_id: number;
  title: string;
  content: string;
  likes: number; // Tổng số likes, nếu API trả về
  image: string[];
  created_at: string;
  updated_at: string;
  status: boolean;
  is_active: boolean;
  user: User;
  category: CategoryInfo;
  place: PlaceInfo;
  like: LikeInfo[]; // Mảng chi tiết các lượt like từ API
  likedByUser: boolean; // Thuộc tính được thêm vào, PostCard yêu cầu
  commentCount?: number; // Optional, nếu PostCard của bạn cần và API có thể cung cấp
}
// --- KẾT THÚC ĐỊNH NGHĨA INTERFACE ---


// --- COMPONENT HIỂN THỊ KẾT QUẢ TÌM KIẾM ---
function SearchResultsDisplay() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQueryDisplay, setSearchQueryDisplay] = useState<string>("");

  // !!! QUAN TRỌNG: Thay thế bằng logic lấy ID người dùng thực tế !!!
  // Ví dụ: nếu dùng NextAuth.js:
  // import { useSession } from "next-auth/react";
  // const { data: session } = useSession();
  // const currentUserId = session?.user?.id as number | undefined;
  const currentUserId: number | undefined = 1; // <<<< THAY THẾ GIÁ TRỊ NÀY

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const locationName = searchParams.get("locationName");
    const categoryId = searchParams.get("category_id");

    let displayQuery = "";
    if (keyword) displayQuery += `Từ khóa: "${keyword}" `;
    if (locationName) displayQuery += `Địa điểm: "${locationName}" `;
    if (categoryId) displayQuery += `Danh mục ID: "${categoryId}" `;
    setSearchQueryDisplay(displayQuery.trim());

    const fetchData = async () => {
      const apiParams = new URLSearchParams();
      if (keyword) apiParams.set("keyword", keyword);
      if (locationName) apiParams.set("locationName", locationName);
      if (categoryId) apiParams.set("category_id", categoryId);

      if (!apiParams.toString()) {
        setPosts([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/search/advanced?${apiParams.toString()}`);
        // Dữ liệu thô từ API, chưa có likedByUser
        let fetchedRawPosts: Omit<Post, 'likedByUser' | 'commentCount'>[] = response.data || [];

        // Xử lý dữ liệu để thêm likedByUser và các trường cần thiết khác
        const processedPosts: Post[] = fetchedRawPosts.map(rawPost => {
          const liked = currentUserId
            ? rawPost.like.some(likeDetail => likeDetail.user_id === currentUserId)
            : false;

          return {
            ...rawPost,
            likedByUser: liked,
            // Gán giá trị mặc định cho commentCount nếu API không trả về
            // Hoặc bạn có thể fetch riêng commentCount nếu cần và API search không có
            commentCount: (rawPost as any).commentCount || 0,
          };
        });

        setPosts(processedPosts);
      } catch (err: any) {
        console.error("Failed to fetch search results:", err);
        setError(err.response?.data?.message || "Không thể tải kết quả tìm kiếm.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, currentUserId]); // Thêm currentUserId vào dependency array nếu nó có thể thay đổi

  if (loading) {
    return <div className="text-center py-10">Đang tìm kiếm kết quả...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (posts.length === 0 && searchQueryDisplay) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">
          Không tìm thấy bài viết nào cho: <span className="font-semibold">{searchQueryDisplay}</span>.
        </p>
        <Button asChild>
          <Link href="/posts/create">Hoặc chia sẻ trải nghiệm của bạn</Link>
        </Button>
      </div>
    );
  }

  if (posts.length === 0 && !searchQueryDisplay) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Sử dụng thanh tìm kiếm phía trên để tìm bài viết.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {searchQueryDisplay && (
        <p className="text-sm text-muted-foreground mb-4">
          Kết quả tìm kiếm cho: <span className="font-semibold">{searchQueryDisplay}</span>
        </p>
      )}
      {posts.map((post) => (
        // Bây giờ `post` đã có thuộc tính `likedByUser`
        <PostCard key={post.id} post={post} layout="horizontal" />
      ))}
    </div>
  );
}
// --- KẾT THÚC COMPONENT HIỂN THỊ KẾT QUẢ TÌM KIẾM ---


// --- COMPONENT PAGE CHÍNH ---
export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <main>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Kết quả tìm kiếm</h1>
        </div>
        <Suspense fallback={<div className="text-center py-10">Đang tải nội dung tìm kiếm...</div>}>
          <SearchResultsDisplay />
        </Suspense>
      </main>
    </div>
  );
}
// --- KẾT THÚC COMPONENT PAGE CHÍNH ---