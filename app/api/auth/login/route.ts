import { generateToken } from '@/api/lib/jwt'
import { connectToDatabase } from '@/api/lib/mongodb'
import User from '@/api/models/User'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  await connectToDatabase()

  const user = await User.findOne({ email })

  if (!user) {
    return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), { status: 404 })
  }

  // Verifique se a senha fornecida corresponde à senha armazenada
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return new Response(JSON.stringify({ error: 'Credenciais inválidas' }), { status: 401 })
  }

  // Geração do token de autenticação
  const token = generateToken({ id: user._id })

  // Retorne a resposta com o token de autenticação
  return new Response(JSON.stringify({ success: true, user, token }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
