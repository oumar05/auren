import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  if (!isSupabaseConfigured) {
    return Response.json(
      { error: 'Supabase not configured' },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json(data);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    return Response.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
