import bcrypt from 'bcryptjs'; // Módulos externos devem ser importados primeiro
import { type NextRequest } from 'next/server'; // Importação do Next.js depois
import User from '@/api/models/User'; // Seus módulos locais
import { connectToDatabase } from '@/api/lib/mongodb.js'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Conectar ao banco de dados
    await connectToDatabase();

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email já cadastrado.' }), { status: 400 });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Responder com sucesso
    return new Response(JSON.stringify({ message: 'Usuário criado com sucesso!' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao criar usuário.' }), { status: 500 });
  }
}
