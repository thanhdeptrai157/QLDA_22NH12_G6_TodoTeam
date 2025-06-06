// hooks/use-chat-messages.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import { STORAGE_KEY, CHANNEL_NAME, MAX_MESSAGES } from "@/types/store"
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}


export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [channel, setChannel] = useState<BroadcastChannel | null>(null)

  // Setup BroadcastChannel và load initial data
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Tạo broadcast channel
    const bc = new BroadcastChannel(CHANNEL_NAME)
    setChannel(bc)

    // Load messages từ localStorage
    const loadMessages = () => {
      try {
          const stored = localStorage.getItem(STORAGE_KEY)
          
        if (stored) {
          const parsedMessages = JSON.parse(stored).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
          setMessages(parsedMessages)
        } else {
          const welcomeMessage: Message = {
            id: "welcome",
            role: "assistant",
            content: "Xin chào! Tôi là TravelBot, trợ lý AI của TravelShare. Tôi có thể giúp bạn tìm kiếm địa điểm du lịch, đề xuất các hoạt động và trả lời các câu hỏi về du lịch. Bạn muốn tìm hiểu về địa điểm nào?",
            timestamp: new Date(),
          }
          setMessages([welcomeMessage])
        }
      } catch (error) {
        setMessages([])
      } finally {
        setIsLoaded(true)
      }
    }

    // Listen for broadcast messages từ tabs/pages khác
    bc.onmessage = (event) => {
     
      if (event.data.type === 'MESSAGES_UPDATED') {
        const syncedMessages = event.data.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(syncedMessages)
      } else if (event.data.type === 'MESSAGES_CLEARED') {
        const welcomeMessage: Message = {
          id: "welcome",
          role: "assistant", 
          content: "Xin chào! Tôi là TravelBot, trợ lý AI của TravelShare. Tôi có thể giúp bạn tìm kiếm địa điểm du lịch, đề xuất các hoạt động và trả lời các câu hỏi về du lịch. Bạn muốn tìm hiểu về địa điểm nào?",
          timestamp: new Date(),
        }
        setMessages([welcomeMessage])
      }
      }
      
    loadMessages()
    return () => {
      bc.close()
    }
  }, [])

  // Save to localStorage khi messages thay đổi
  useEffect(() => {
    if (isLoaded && messages.length > 0) {
      try {
        const messagesToSave = messages.slice(-MAX_MESSAGES)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToSave))
       
      } catch (error) {
        
      }
    }
  }, [messages, isLoaded])

  // Add message với broadcast
  const addMessage = useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      timestamp: new Date(),
      ...message,
    }
    
    setMessages(prev => {
      const updated = [...prev, newMessage]
      
      // Broadcast to other tabs/pages
      if (channel) {
        console.log('📡 Broadcasting message update')
        channel.postMessage({
          type: 'MESSAGES_UPDATED',
          messages: updated
        })
      }
      
      return updated
    })
    
    return newMessage
  }, [channel])

  // Clear messages với broadcast
  const clearMessages = useCallback(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: "Xin chào! Tôi là TravelBot, trợ lý AI của TravelShare. Tôi có thể giúp bạn tìm kiếm địa điểm du lịch, đề xuất các hoạt động và trả lời các câu hỏi về du lịch. Bạn muốn tìm hiểu về địa điểm nào?",
      timestamp: new Date(),
    }
    
    setMessages([welcomeMessage])
    
    // Broadcast clear action
    if (channel) {
      channel.postMessage({
        type: 'MESSAGES_CLEARED'
      })
    }
  }, [channel])

  

  return {
    messages,
    isLoaded,
    addMessage,
    clearMessages,
  }
}