import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

export async function GET() {
  if (!isSupabaseConfigured || !supabase) {
    return Response.json(
      { error: 'Supabase not configured' },
      { status: 500, headers: corsHeaders }
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
        { status: 500, headers: corsHeaders }
      );
    }

    return Response.json(data, { headers: corsHeaders });
  } catch (err) {
    console.error('Error fetching gallery:', err);
    return Response.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500, headers: corsHeaders }
    );
  }
}
