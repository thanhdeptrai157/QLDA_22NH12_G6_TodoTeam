import { NextRequest, NextResponse } from 'next/server';
import { GOONG } from '@/constants/api-endpoint';
import { GOONG_MAP_KEY } from '@/configs/env';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url!);
    const type = searchParams.get('type'); // 'normal' hoặc 'satellite'
    if (!type) {
      return NextResponse.json({ error: 'Missing type' }, { status: 400 });
    }
    let url = '';
    if (type === 'normal') {
      url = GOONG.MAP_NORMAL(GOONG_MAP_KEY!);
    } else if (type === 'satellite') {
      url = GOONG.MAP_SATELLITE(GOONG_MAP_KEY!);
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Failed to fetch map style');
    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
