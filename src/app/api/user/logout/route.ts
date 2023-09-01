import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({
        error: "unauthorized attempt...!!!",
        status: 401,
      });
    }

    cookies().delete("token");

    return NextResponse.json({
      message: "Logged out successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while logging out...!!!",
      status: 500,
    });
  }
}
