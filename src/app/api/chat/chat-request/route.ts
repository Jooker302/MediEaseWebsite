import connectMongo from '@/libs/MongoDB';
import Appointment from '@/models/Appointment';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  await connectMongo();

  try {
    const appointments = await Appointment.find();

    const formattedAppointments = await Promise.all(appointments.map(async appointment => {
      const user = await User.findById(appointment.user_id);
      let doctor = null;

      if (appointment.doctor_id) {
        doctor = await User.findById(appointment.doctor_id);
      }

      return {
        id: appointment._id,
        user_id: appointment.user_id,
        is_changed: appointment.is_changed,
        is_active: appointment.is_active,
        created_at: appointment.created_at,
        user_name: user ? user.name : 'Unknown',
        doctor_id: appointment.doctor_id,
        doctor_name: doctor ? doctor.name : null,
      };
    }));

    return new NextResponse(JSON.stringify({ data: formattedAppointments }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = 'force-dynamic';
