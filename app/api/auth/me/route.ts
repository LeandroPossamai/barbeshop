import { verifyToken } from '@/api/lib/jwt'
import { connectToDatabase } from '@/api/lib/mongodb'
import User from '@/api/models/User'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const tokenResponse = verifyToken(req)
  if (tokenResponse instanceof Response) return tokenResponse

  await connectToDatabase()

  const user = await User.findOne({ _id: tokenResponse.id })

  if (!user) {
    return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), { status: 404 })
  }

  return new Response(JSON.stringify(user), { status: 200 })
}
