import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { get } from "http";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findOne({ _id: userID }).select("-password -__v");
        return NextResponse.json({
            message: "User details fetched successfully",
            success: true,
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
        
    }
}