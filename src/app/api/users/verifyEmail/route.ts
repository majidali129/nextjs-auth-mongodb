import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      emailVerifyToken: token,
      emailVerifyTokenExpiry: { $gt: Date.now() }
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });

    user.isEmailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully"
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
