import dbConnect from "@/lib/dbConnect";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const { name, email, password } = await req.json();
        
        if (!name || !email || !password) {
            return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 });
        }

        // password length check
        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
        }

        await dbConnect();

        // check is the user exist
        const existUser = await User.findOne({ email });
        if (existUser) {
            return NextResponse.json({ message: "User already exist" }, { status: 400 });
        }

        //password hash
        const hashedPassword = await bcrypt.hash(password, 10); // here 10 is salt. it is used for strong hash

        //create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
            { status: 201 },
        );
    } catch(error){
        console.error("Registration error:", error)
        return NextResponse.json(
            {message: "Error registering user. Please try again later."},
            {status: 500}
        )
    }
}

//signup process

// 1. Check existing user 

// 2. password check for 6 character(optional)

// 3. hashed the password with bcrypt

// 4. create user