// import dynamic from 'next/dynamic';
// pages/api/users.js
import MongoDB from '@/libs/MongoDB';
import User from '@/models/User';
import { NextRequest } from 'next/server';
// import User from '@/models/User';

export const POST = async (request: any, { params }: { params: any }) => {
    await MongoDB();

    try {
        // console.log(request.json());
        const requestData = await request.json();

        // const requestData = await request.json();

        // Extract data from the request
        const { name, email, password, age, gender, profileImage } = requestData;

        const user = await User.findOne({ _id: params.id });
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        user.age = age || user.age;
        user.gender = gender || user.gender;
        user.image = profileImage || user.image;

        // Only update the password if it's provided and not empty
        if (password !== null && password !== '') {
            user.password = password;
        }

        // Save the updated user
        await user.save();

        return new Response(JSON.stringify({ data: 'User Updated' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};

export const dynamic = 'force-dynamic';
