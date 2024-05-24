import connectMongo from '@/libs/MongoDB';
import Appointment from '@/models/Appointment';
import User from '@/models/User'; // Assuming the User model is used for doctors as well
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  await connectMongo();

  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return new NextResponse(JSON.stringify({ message: 'user_id is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Fetch all appointments where user_id matches
    const appointments = await Appointment.find({
      user_id
    });

    if (appointments.length === 0) {
      return new NextResponse(JSON.stringify({ message: 'No appointments found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // Format the response
    const formattedAppointments = await Promise.all(appointments.map(async appointment => {
      let doctor_name = null;
      let doctor_image = null;

      if (appointment.doctor_id) {
        const doctor = await User.findById(appointment.doctor_id);
        doctor_name = doctor ? doctor.name : null;
        doctor_image = doctor ? doctor.image : null;
      }

      // Format created_at to exclude the seconds part
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
        doctor_id: appointment.doctor_id,
        doctor_name: doctor_name,
        doctor_image: doctor_image,
        created_at: created_at,
      };
    }));

    return new NextResponse(JSON.stringify({ data: formattedAppointments }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = 'force-dynamic';
