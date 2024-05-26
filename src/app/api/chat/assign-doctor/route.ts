import connectMongo from '@/libs/MongoDB';
import Appointment from '@/models/Appointment';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
  await connectMongo();

  try {
    // console.log(req.body);
    const { appointment_id, doctor_id } = await req.json();

    if (!appointment_id || !doctor_id) {
      return new NextResponse(JSON.stringify({ message: 'appointment_id and doctor_id are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Find the existing appointment
    const appointment = await Appointment.findById(appointment_id);
    if (!appointment) {
      return new NextResponse(JSON.stringify({ message: 'Appointment not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update the appointment with the assigned doctor ID
    appointment.doctor_id = doctor_id;
    await appointment.save();

    return new NextResponse(JSON.stringify({ message: 'Doctor assigned successfully', appointment }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error assigning doctor:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
