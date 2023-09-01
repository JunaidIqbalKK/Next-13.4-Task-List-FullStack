import { prisma } from "@/db";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields...!!!" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return NextResponse.json(
        { error: "user not found...!!!" },
        { status: 400 }
      );
    }

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json(
        { error: "invalid password...!!!" },
        { status: 401 }
      );
    }

    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = Jwt.sign(tokenData, process.env.JWT_KEY as string, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "User logged in successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while loggin in...!!!" },
      { status: 500 }
    );
  }
}
