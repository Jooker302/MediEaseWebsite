import connectMongo from '@/libs/MongoDB';
import Appointment from '@/models/Appointment';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  await connectMongo();

  try {
    const appointments = await Appointment.find({ doctor_id: null });

    const formattedAppointments = appointments.map(appointment => ({
      id: appointment._id,
      user_id: appointment.user_id,
      is_changed: appointment.is_changed,
      is_active: appointment.is_active,
      created_at: appointment.created_at,
    }));

    return new NextResponse(JSON.stringify({ data: formattedAppointments }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = 'force-dynamic';
