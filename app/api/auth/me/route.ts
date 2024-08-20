import { NextRequest } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import { verifyToken } from "../../lib/jwt"; // Certifique-se de que esta função está corretamente implementada

export async function GET(req: NextRequest) {
  const tokenResponse = verifyToken(req);
  if (tokenResponse instanceof Response) return tokenResponse;

  await connectToDatabase();

  const user = await User.findOne({ _id: tokenResponse.id });

  if (!user) {
    return new Response(JSON.stringify({ error: "Usuário não encontrado" }), {
      status: 404,
    });
  }
  console.log("Usuário encontrado:", user);
  return new Response(JSON.stringify(user), { status: 200 });
}
