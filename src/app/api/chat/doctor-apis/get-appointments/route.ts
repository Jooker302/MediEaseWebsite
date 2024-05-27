import connectMongo from '@/libs/MongoDB';
import Appointment from '@/models/Appointment';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  await connectMongo();

  try {
    const { doctor_id } = await req.json();

    if (!doctor_id) {
      return new NextResponse(JSON.stringify({ message: 'doctor_id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const appointments = await Appointment.find({ doctor_id });

    if (!appointments.length) {
      return new NextResponse(JSON.stringify({ message: 'No appointments found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const formattedAppointments = await Promise.all(appointments.map(async (appointment) => {
      let user_name = null;
      let user_image = null;

      if (appointment.user_id) {
        const user = await User.findById(appointment.user_id);
        user_name = user ? user.name : null;
        user_image = user ? user.image : null;
      }

      const created_at = new Date(appointment.created_at).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      return {
        id: appointment._id,
        user_id: appointment.user_id,
        user_name,
        user_image,
        doctor_id: appointment.doctor_id,
        created_at,
      };
    }));

    return new NextResponse(JSON.stringify({ data: formattedAppointments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const dynamic = 'force-dynamic';
