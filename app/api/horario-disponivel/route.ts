import { NextRequest } from 'next/server';
import Schedule from '@/api/models/Schedule';
import { connectToDatabase } from '@/api/lib/mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const barberId = searchParams.get('barberId');
  const date = searchParams.get('date');

  try {
    await connectToDatabase();

    const schedule = await Schedule.findOne({ barberId, date });

    if (!schedule) {
      return new Response(JSON.stringify({ times: [] }), { status: 200 });
    }

    return new Response(JSON.stringify(schedule.times), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar horários.' }), { status: 500 });
  }
}
