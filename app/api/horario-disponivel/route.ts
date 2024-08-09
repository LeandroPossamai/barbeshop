import { NextRequest } from 'next/server';
import Schedule from '@/api/models/Schedule';
import { connectToDatabase } from '@/api/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const barberId = searchParams.get('barberId');
  const dateStr = searchParams.get('date');

  try {
    await connectToDatabase();

    // Verifica se a data fornecida é válida
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) {
      return new Response(JSON.stringify({ error: 'Data inválida.' }), { status: 400 });
    }

    // Define o início e o fim do dia para a data especificada
    const startOfDay = new Date(Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate(), 23, 59, 59, 999));

    console.log('Data de início do dia:', startOfDay.toISOString());
    console.log('Data de fim do dia:', endOfDay.toISOString());

    // Busca por agendamentos onde a data está dentro do intervalo do dia
    const schedule = await Schedule.findOne({
      barberId: new mongoose.Types.ObjectId(barberId),
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).exec();

    console.log('Resultado da consulta:', schedule);

    if (!schedule) {
      return new Response(JSON.stringify({ times: [] }), { status: 200 });
    }

    return new Response(JSON.stringify(schedule.times), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar horários.' }), { status: 500 });
  }
}
