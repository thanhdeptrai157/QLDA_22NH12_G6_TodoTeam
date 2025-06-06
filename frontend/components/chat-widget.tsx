"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User, X, MessageSquare, Minimize2, Maximize2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { useChatMessages } from "@/hooks/use-chat-messages" // ✅ Import hook

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  
  // Sử dụng custom hook thay vì useState local
  const { messages, isLoaded, addMessage } = useChatMessages()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && !isMinimized && isLoaded) {
      scrollToBottom()
    }
  }, [messages, isOpen, isMinimized, isLoaded])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message using hook
    addMessage({
      role: "user",
      content: input,
    })

    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Bạn là TravelBot, một trợ lý AI chuyên về du lịch Việt Nam. Luôn trả lời bằng tiếng Việt, thân thiện, đúng ngữ nghĩa, cung cấp thông tin chính xác, đề xuất địa điểm, hoạt động phù hợp và giải đáp mọi thắc mắc về du lịch. Nếu câu hỏi không liên quan đến du lịch, hãy trả lời: 'Xin lỗi, tôi chỉ có thể hỗ trợ các thông tin liên quan đến du lịch.'\n\nCâu hỏi: ${currentInput}`
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi không có câu trả lời phù hợp."

      // Add bot response using hook
      addMessage({
        role: "assistant",
        content: text,
      })
    } catch (error) {
      console.error("Chat error:", error)
      
      toast({
        title: "Lỗi",
        description: "Không thể kết nối với trợ lý AI. Vui lòng thử lại sau.",
        variant: "destructive",
      })

      // Add error message using hook
      addMessage({
        role: "assistant",
        content: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Chỉ render khi messages đã load xong
  if (!isLoaded) {
    return null // Hoặc skeleton loading
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`bg-card border rounded-lg shadow-lg overflow-hidden flex flex-col w-80 md:w-96 mb-2 ${
              isMinimized ? "h-auto" : "h-[500px]"
            }`}
          >
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-medium">TravelBot</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:bg-white/20"
                  onClick={toggleMinimize}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:bg-white/20"
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-3 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className="h-8 w-8">
                          {message.role === "user" ? (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                              <AvatarFallback>
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[80%]">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-3 bg-muted">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce"></div>
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce delay-75"></div>
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce delay-150"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Nhập tin nhắn..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                      className="flex-grow"
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleChat}
        size="icon"
        className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-primary-dark shadow-lg hover:shadow-xl transition-all"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  )
}

