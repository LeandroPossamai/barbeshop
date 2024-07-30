import bcrypt from "bcryptjs";
import { type NextRequest } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import { generateToken } from "../../lib/jwt";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const token = generateToken({ id: user._id });
    return new Response(JSON.stringify({ success: true, user, token }));
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }
}
