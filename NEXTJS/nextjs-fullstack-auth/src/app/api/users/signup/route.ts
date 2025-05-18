import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        console.log(reqBody);

        // Check if user already exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Return the new user
        return NextResponse.json({message: "User created successfully", success: true, user: savedUser}, {status: 201});
        


        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});

        
    }
}