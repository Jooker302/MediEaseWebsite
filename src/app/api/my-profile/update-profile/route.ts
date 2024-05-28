// pages/api/users.js
import MongoDB from '@/libs/MongoDB';
import User from '@/models/User';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

export const POST = async (request: any, { params }: { params: any }) => {
    await MongoDB();

    try {
        const requestData = await request.json();

        // Extract data from the request
        const { name, email, password, user_id } = requestData;

        // Check if user exists
        const user = await User.findOne({ _id: user_id });
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        // Update user details
        user.name = name || user.name;
        if (password !== undefined && password !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        return new Response(JSON.stringify({ data: 'User Updated' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};

export const dynamic = 'force-dynamic';
