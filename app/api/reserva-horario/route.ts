import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Schedule from '@/api/models/Schedule';
import { connectToDatabase } from '@/api/lib/mongodb';

export async function PUT(req: NextRequest) {
  try {
    const { barberId, date, time } = await req.json();

    console.log('Recebido BarberId:', barberId);
    console.log('Recebido Date:', date);
    console.log('Recebido Time:', time);

    await connectToDatabase();

    if (!barberId || !date || !time) {
      console.error('Parâmetros obrigatórios ausentes.');
      return new Response(JSON.stringify({ error: 'Parâmetros obrigatórios ausentes.' }), { status: 400 });
    }

    // Conversão do barberId para ObjectId
    let barberObjectId;
    try {
      barberObjectId = new mongoose.Types.ObjectId(barberId);
    } catch (error) {
      console.error('Erro ao converter barberId:', error);
      return new Response(JSON.stringify({ error: 'ID do barbeiro inválido.' }), { status: 400 });
    }

    const dateObj = new Date(date);

    console.log('ObjectId criado:', barberObjectId);
    console.log('Objeto Date criado:', dateObj);

    const schedule = await Schedule.findOne({
      barberId: barberObjectId,
      date: {
        $gte: new Date(dateObj.setUTCHours(0, 0, 0, 0)),
        $lt: new Date(dateObj.setUTCHours(23, 59, 59, 999)),
      }
    });

    if (!schedule) {
      console.error('Agendamento não encontrado.');
      return new Response(JSON.stringify({ error: 'Horário não encontrado.' }), { status: 404 });
    }

    console.log('Agendamento encontrado:', schedule);

    const timeSlot = schedule.times.find(t => t.time === time);

    console.log('Horário encontrado:', timeSlot);

    if (timeSlot && !timeSlot.isBooked) {
      timeSlot.isBooked = true;
      await schedule.save();
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    console.error('Horário já reservado ou inexistente.');
    return new Response(JSON.stringify({ error: 'Horário já reservado ou inexistente.' }), { status: 400 });
  } catch (error) {
    console.error('Erro no servidor:', error);
    return new Response(JSON.stringify({ error: 'Erro ao reservar horário.' }), { status: 500 });
  }
}
