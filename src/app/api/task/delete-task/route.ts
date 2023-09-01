import { prisma } from "@/db";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const id = await req.json();

    const task = await prisma.todo.findUnique({ where: { id } });

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

    if (userId === task?.userId) {
      await prisma.todo.delete({ where: { id } });
    }

    return NextResponse.json({
      message: "Task deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while deleting the task...!!!",
      status: 500,
    });
  }
}
