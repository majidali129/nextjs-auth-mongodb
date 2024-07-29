import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json(
        { error: "Invalid email password. Check your credentials" },
        { status: 400 }
      );

    const token = await jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "1d"
      }
    );

    const response = NextResponse.json(
      {
        message: "User logged in successfully"
      },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
