// lib/gemini.ts
import axios from 'axios'
import { GEMINI_API_KEY, GEMINI_API_URL } from './env'

const geminiAPI = axios.create({
  baseURL: GEMINI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: GEMINI_API_KEY,
  },
})

export default geminiAPI