import { NextRequest } from 'next/server';
import Schedule from '@/api/models/Schedule';
import { connectToDatabase } from '@/api/lib/mongodb';

export async function PUT(req: NextRequest) {
  const { barberId, date, time } = await req.json();

  try {
    await connectToDatabase();

    const schedule = await Schedule.findOne({ barberId, date });

    if (!schedule) {
      return new Response(JSON.stringify({ error: 'Horário não encontrado.' }), { status: 404 });
    }

    const timeSlot = schedule.times.find(t => t.time === time);

    if (timeSlot && !timeSlot.isBooked) {
      timeSlot.isBooked = true;
      await schedule.save();
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Horário já reservado ou inexistente.' }), { status: 400 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao reservar horário.' }), { status: 500 });
  }
}
