import { prisma } from "@/db";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { username, email, password } = data;

    if (!username || !email || !password) {
      return NextResponse.json({
        error: "Please fill all the fields...!!!",
        status: 401,
      });
    }

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      return NextResponse.json({
        error: "User already exists. Please Sign-In...!!!",
        status: 400,
      });
    }

    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(password, salt);

    await prisma.user.create({
      data: { username, email, password: hashPassword },
    });

    return NextResponse.json({
      message: "User registered successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while registering the user...!!!",
      status: 500,
    });
  }
}
