import { connectToDatabase } from '@/api/lib/mongodb'
import User from '@/api/models/User'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, email, number, role, password } = await request.json()

  await connectToDatabase()

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return new Response(JSON.stringify({ error: 'Email já cadastrado.' }), { status: 400 })
  }

  // Criação de um novo usuário
  const newUser = new User({
    name,
    email,
    number,
    role,
    password // Isso vai passar pelo hook "pre-save" que criptografa a senha
  })

  await newUser.save()

  return new Response(null, { status: 201 })
}
