import Link from "next/link"
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <MapPin className="h-5 w-5" />
              <span>TravelShare</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Nền tảng chia sẻ trải nghiệm du lịch hàng đầu Việt Nam. Khám phá những địa điểm tuyệt vời và chia sẻ câu
              chuyện của bạn.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Khám phá</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/beach" className="text-muted-foreground hover:text-primary">
                  Biển
                </Link>
              </li>
              <li>
                <Link href="/categories/mountain" className="text-muted-foreground hover:text-primary">
                  Núi
                </Link>
              </li>
              <li>
                <Link href="/categories/city" className="text-muted-foreground hover:text-primary">
                  Thành phố
                </Link>
              </li>
              <li>
                <Link href="/categories/island" className="text-muted-foreground hover:text-primary">
                  Đảo
                </Link>
              </li>
              <li>
                <Link href="/categories/countryside" className="text-muted-foreground hover:text-primary">
                  Làng quê
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-muted-foreground hover:text-primary">
                  Bài viết
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="text-muted-foreground hover:text-primary">
                  Chatbot AI
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@travelshare.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+84 123 456 789</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TravelShare. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

