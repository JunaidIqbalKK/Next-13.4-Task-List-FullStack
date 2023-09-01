import { prisma } from "@/db";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
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

    const tasks = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Task collected successfully",
      tasks,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while getting the tasks...!!!",
      status: 500,
    });
  }
}
