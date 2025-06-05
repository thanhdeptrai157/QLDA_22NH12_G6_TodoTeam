import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/configs/env';

const supabase = createClient(
  SUPABASE_URL!,
  SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const filePath = formData.get('filePath') as string;
    if (!file || !filePath) {
      return NextResponse.json({ error: 'Missing file or filePath' }, { status: 400 });
    }
    const { data, error } = await supabase.storage
      .from('image-travel-app')
      .upload(filePath, file);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const { data: publicUrlData } = supabase.storage
      .from('image-travel-app')
      .getPublicUrl(filePath);
    return NextResponse.json({ publicUrl: publicUrlData.publicUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
