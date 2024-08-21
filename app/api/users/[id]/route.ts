import { connectToDatabase } from '@/api/lib/mongodb'
import User from '@/api/models/User'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase()
  const user = await User.findById(params.id) // Obtém todos os usuários do banco de dados
  return Response.json(user)
}
