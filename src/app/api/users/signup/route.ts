import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { sendEail } from "@/helpers/mailer";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (user)
      return NextResponse.json(
        {
          error: "User with these credentials already exists"
        },
        { status: 400 }
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      username,
      password: hashedPassword
    };
    const createdUser = await User.create(newUser);
    await sendEail({ email, emailType: "VERIFY", userId: createdUser._id });

    createdUser.password = undefined;
    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        createdUser
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
