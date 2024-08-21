import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  // Normalmente, você não precisa fazer nada no back-end para logout com JWT.
  // O cliente só precisa remover o token.
  return new Response(JSON.stringify({ message: 'Logout realizado com sucesso.' }), { status: 200 });
}
