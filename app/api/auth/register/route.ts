import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/types/db";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    await connect();

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return NextResponse.json({
        message: "email ja cadastrado",
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json({
      message: "Usuario criado com sucesso!",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Erro ao criar usuario!",
      status: 500,
    });
  }
}
