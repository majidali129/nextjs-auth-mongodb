import { NextResponse } from "next/server";

import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export const GET = async () => {
  try {
    const response = NextResponse.json(
      {
        message: "Logout successfully",
        success: true
      },
      { status: 200 }
    );

    response.cookies.set("token", "", { httpOnly: true, expires: Date.now() });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
