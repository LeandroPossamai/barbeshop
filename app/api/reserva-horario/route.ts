import { connectToDatabase } from '@/api/lib/mongodb'
import Schedule from '@/api/models/Schedule'
import mongoose from 'mongoose'
import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest) {
  const { barberId, date, time } = await req.json()

  await connectToDatabase()

  if (!barberId || !date || !time) {
    return new Response(JSON.stringify({ error: 'Parâmetros obrigatórios ausentes.' }), { status: 400 })
  }

  const dateObj = new Date(date)

  const schedule = await Schedule.findOne({
    barberId: new mongoose.Types.ObjectId(barberId),
    date: {
      $gte: new Date(dateObj.setUTCHours(0, 0, 0, 0)),
      $lt: new Date(dateObj.setUTCHours(23, 59, 59, 999))
    }
  })

  if (!schedule) {
    return new Response(JSON.stringify({ error: 'Horário não encontrado.' }), { status: 404 })
  }

  const timeSlot = schedule.times.find((t: any) => t.time === time)

  if (timeSlot && !timeSlot.isBooked) {
    timeSlot.isBooked = true
    await schedule.save()
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  }

  console.error('Horário já reservado ou inexistente.')
  return new Response(JSON.stringify({ error: 'Horário já reservado ou inexistente.' }), { status: 400 })
}
