// pages/api/chat/assign-doctor.js

import MongoDB from '@/libs/MongoDB';
import Appointment from '@/models/Appointment';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await MongoDB();

  try {
    const { appointment_id, doctor_id } = req.body;

    if (!appointment_id || !doctor_id) {
      return res.status(400).json({ message: 'appointment_id and doctor_id are required' });
    }

    // Find the existing appointment
    const appointment = await Appointment.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update the appointment with the assigned doctor ID
    appointment.doctor_id = doctor_id;
    await appointment.save();

    return res.status(200).json({ message: 'Doctor assigned successfully', appointment });
  } catch (error) {
    console.error('Error assigning doctor:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
