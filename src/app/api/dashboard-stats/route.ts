// src/app/api/dashboard-stats/route.ts

import { NextRequest, NextResponse } from 'next/server';
import MongoDB from '@/libs/MongoDB';
import User from '@/models/User';
import ChatRequest from '@/models/Appointment';

export async function GET(req: NextRequest) {
    await MongoDB();

    try {
        // Count the number of users with role 'User'
        const userCount = await User.countDocuments({ role: 'Patient' });

        // Count the number of doctors with role 'Doctor'
        const doctorCount = await User.countDocuments({ role: 'Doctor' });

        // Count the number of chat requests where doctor_id is null
        const chatRequestCount = await ChatRequest.countDocuments({ doctor_id: null });

        return NextResponse.json({
            users: userCount,
            doctors: doctorCount,
            chatRequests: chatRequestCount
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
