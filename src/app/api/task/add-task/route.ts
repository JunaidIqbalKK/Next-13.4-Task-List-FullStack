import { prisma } from "@/db";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { title, description } = data;

    if (!title || !description) {
      return NextResponse.json({
        error: "Please fill all the fields...!!!",
        status: 401,
      });
    }

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "";

    if (!token) {
      return NextResponse.json({
        error: "unauthorized attempt...!!!",
        status: 401,
      });
    }

    const decoded = Jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as JwtPayload;

    if (!decoded) {
      return NextResponse.json({
        error: "invalid token...!!!",
        status: 401,
      });
    }

    const userId = decoded.id;

    await prisma.todo.create({
      data: { title, description, userId, complete: false },
    });

    return NextResponse.json({
      message: "Task added successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while adding the task...!!!",
      status: 500,
    });
  }
}
