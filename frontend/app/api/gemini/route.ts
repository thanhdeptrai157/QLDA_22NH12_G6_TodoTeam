// app/api/gemini/route.ts
import geminiAPI from '@/configs/gemini'
import { GEMINI } from '@/constants/api-endpoint'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const prompt = body.prompt || 'Say hello!'

    const response = await geminiAPI.post(GEMINI.MODEL_2_0_FLASH, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Gemini error:', error?.response?.data || error.message)
    return NextResponse.json(
      { error: 'Gemini API Error', detail: error?.response?.data },
      { status: error?.response?.status || 500 }
    )
  }
}
