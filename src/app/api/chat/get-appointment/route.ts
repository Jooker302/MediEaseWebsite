import connectMongo from '@/libs/MongoDB';
import Appointment from '@/models/Appointment';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  await connectMongo();

  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return new NextResponse(JSON.stringify({ message: 'user_id is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const appointment = await Appointment.findOne({
      user_id,
      doctor_id: null
    });

    if (!appointment) {
      return new NextResponse(JSON.stringify({ message: 'No appointment found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const formattedAppointment = {
      id: appointment._id,
      user_id: appointment.user_id,
      doctor_id: appointment.doctor_id,
    };

    return new NextResponse(JSON.stringify({ data: formattedAppointment }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = 'force-dynamic';
