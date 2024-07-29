import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findById(userId).select("-password");
    if (!user)
      return NextResponse.json(
        { error: "Invalid access token" },
        { status: 400 }
      );

    return NextResponse.json(
      { message: "Current user details fetched successfully", user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
