import { connectToDatabase } from '@/api/lib/mongodb'
import Schedule from '@/api/models/Schedule'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { barberId, date, times } = await req.json()

  await connectToDatabase()

  const newSchedule = new Schedule({
    barberId,
    date,
    times
  })

  await newSchedule.save()

  return new Response(JSON.stringify({ success: true }), { status: 201 })
}
