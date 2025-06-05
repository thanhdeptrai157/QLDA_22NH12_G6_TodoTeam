import { NextRequest, NextResponse } from 'next/server';
import openWeatherAxios from '@/configs/openweather';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url!);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    if (!lat || !lon) {
      return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 });
    }
    const params = {
      lat,
      lon,
      units: 'metric',
      lang: 'vi',
    };
    const response = await openWeatherAxios.get('/weather', { params });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
