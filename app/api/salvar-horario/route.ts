import { NextRequest } from 'next/server';
import Schedule from '@/api/models/Schedule';
import { connectToDatabase } from '@/api/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { barberId, date, times } = await req.json();

    await connectToDatabase();

    const newSchedule = new Schedule({
      barberId,
      date,
      times,
    });

    await newSchedule.save();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Erro ao salvar horários.' }), { status: 500 });
  }
}
