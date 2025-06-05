import goongAxios from '@/configs/goong';
import { GOONG } from '@/constants/api-endpoint';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { type, params } = await req.json();
    let url = '';
    let queryParams: Record<string, string> = {};
    if (type === 'suggest') {
      url = GOONG.PLACE_SUGGEST;
      queryParams = {
        input: params.input,
      };
    } else if (type === 'detail') {
      url = GOONG.PLACE_DETAIL;
      queryParams = {
        place_id: params.place_id,
      };
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
    const response = await goongAxios.get(url, { params: queryParams });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
