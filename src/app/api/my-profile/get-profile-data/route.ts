import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import MongoDB from "@/libs/MongoDB";
import User from "@/models/User";
import { NextResponse } from 'next/server';


export const POST = async (req: any) => {
  

  // Connect to MongoDB
  await MongoDB();

  try {
    const { email, name, password, confirmPassword } = req.body;

    // Validate input
    if (!email || !name || (password && password !== confirmPassword)) {
      return new NextResponse(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({  error: "User not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    
    user.name = name;
    user.email = email;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return new NextResponse(JSON.stringify({ message: "Profile updated successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
