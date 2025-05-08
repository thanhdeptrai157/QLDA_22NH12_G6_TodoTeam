"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Check, X, Search } from "lucide-react"

export default function AdminPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for reported posts
  const reportedPosts = [
    {
      id: 1,
      title: "Bãi biển Nha Trang - Thiên đường nghỉ dưỡng",
      author: "Nguyễn Văn A",
      reportCount: 3,
      reportReason: "Nội dung không phù hợp",
      date: "2025-03-20",
    },
    {
      id: 2,
      title: "Đà Lạt mùa hoa - Thành phố ngàn hoa",
      author: "Trần Thị B",
      reportCount: 5,
      reportReason: "Thông tin sai lệch",
      date: "2025-03-18",
    },
    {
      id: 3,
      title: "Phú Quốc - Hòn đảo ngọc",
      author: "Lê Văn C",
      reportCount: 2,
      reportReason: "Spam",
      date: "2025-03-15",
    },
  ]

  // Mock data for pending posts
  const pendingPosts = [
    {
      id: 4,
      title: "Vịnh Lan Hạ - Thiên đường ẩn mình",
      author: "Phạm Thị D",
      date: "2025-03-22",
    },
    {
      id: 5,
      title: "Hang Sơn Đoòng - Kỳ quan thiên nhiên",
      author: "Hoàng Văn E",
      date: "2025-03-21",
    },
  ]

  // Mock data for users
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      postCount: 15,
      status: "active",
      joinDate: "2025-01-15",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      postCount: 8,
      status: "active",
      joinDate: "2025-02-10",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      postCount: 3,
      status: "banned",
      joinDate: "2025-03-05",
    },
  ]

  const handleApprovePost = (id: number) => {
    toast({
      title: "Bài viết đã được phê duyệt",
      description: `Bài viết #${id} đã được phê duyệt thành công.`,
    })
  }

  const handleRejectPost = (id: number) => {
    toast({
      title: "Bài viết đã bị từ chối",
      description: `Bài viết #${id} đã bị từ chối.`,
    })
  }

  const handleBanUser = (id: number) => {
    toast({
      title: "Người dùng đã bị cấm",
      description: `Người dùng #${id} đã bị cấm thành công.`,
    })
  }

  const handleUnbanUser = (id: number) => {
    toast({
      title: "Đã bỏ cấm người dùng",
      description: `Người dùng #${id} đã được bỏ cấm thành công.`,
    })
  }

  const filteredReportedPosts = reportedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPendingPosts = pendingPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Trang quản trị</h1>

      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="reported">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reported">
            Bài viết bị báo cáo
            <Badge variant="destructive" className="ml-2">
              {reportedPosts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Bài viết chờ duyệt
            <Badge variant="secondary" className="ml-2">
              {pendingPosts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="users">Quản lý người dùng</TabsTrigger>
        </TabsList>

        <TabsContent value="reported">
          <Card>
            <CardHeader>
              <CardTitle>Bài viết bị báo cáo</CardTitle>
              <CardDescription>Quản lý các bài viết bị người dùng báo cáo vi phạm</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Số báo cáo</TableHead>
                    <TableHead>Lý do</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReportedPosts.length > 0 ? (
                    filteredReportedPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>{post.id}</TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{post.reportCount}</Badge>
                        </TableCell>
                        <TableCell>{post.reportReason}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleApprovePost(post.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 w-8 p-0"
                              onClick={() => handleRejectPost(post.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Không có bài viết nào bị báo cáo
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Bài viết chờ duyệt</CardTitle>
              <CardDescription>Quản lý các bài viết đang chờ phê duyệt</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPendingPosts.length > 0 ? (
                    filteredPendingPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>{post.id}</TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleApprovePost(post.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 w-8 p-0"
                              onClick={() => handleRejectPost(post.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Không có bài viết nào đang chờ duyệt
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý người dùng</CardTitle>
              <CardDescription>Quản lý tài khoản người dùng trên hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Số bài viết</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tham gia</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.postCount}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                            {user.status === "active" ? "Hoạt động" : "Bị cấm"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          {user.status === "active" ? (
                            <Button size="sm" variant="destructive" onClick={() => handleBanUser(user.id)}>
                              Cấm
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleUnbanUser(user.id)}>
                              Bỏ cấm
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Không tìm thấy người dùng nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

