import { NextRequest } from 'next/server';
import Schedule from '@/api/models/Schedule';
import { connectToDatabase } from '@/api/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const barberId = searchParams.get('barberId');
  const dateStr = searchParams.get('date');

  try {
    // Verifique se barberId ou dateStr são nulos
    if (!barberId || !dateStr) {
      return new Response(JSON.stringify({ error: 'BarberId e date são obrigatórios.' }), { status: 400 });
    }

    await connectToDatabase();

    // Converte a string da data para um objeto Date
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) {
      return new Response(JSON.stringify({ error: 'Data inválida.' }), { status: 400 });
    }

    // Define o início e o fim do dia para a data especificada
    const startOfDay = new Date(Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate(), 23, 59, 59, 999));

    console.log('Data de início do dia:', startOfDay.toISOString());
    console.log('Data de fim do dia:', endOfDay.toISOString());

    // Busca por todos os agendamentos onde a data está dentro do intervalo do dia
    const schedules = await Schedule.find({
      barberId: new mongoose.Types.ObjectId(barberId),
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).exec();

    console.log('Resultado da consulta:', schedules);

    if (schedules.length === 0) {
      return new Response(JSON.stringify({ times: [] }), { status: 200 });
    }

    // Combina todos os horários de todos os documentos encontrados
    const combinedTimes = schedules.reduce((acc, schedule) => {
      return acc.concat(schedule.times);
    }, []);

    return new Response(JSON.stringify(combinedTimes), { status: 200 });
  } catch (error) {
    console.error('Erro:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar horários.' }), { status: 500 });
  }
}
