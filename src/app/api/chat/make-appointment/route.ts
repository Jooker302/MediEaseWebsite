import connectMongo from '@/libs/MongoDB';
import Appointment from '@/models/Appointment';
import Message from '@/models/Message';

export const POST = async (req: any) => {
  try {
    await connectMongo();

    const { user_id, message } = await req.json();

    if (!user_id || !message) {
      return new Response(JSON.stringify({ message: 'user_id and message are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    
    const newAppointment = new Appointment({
      user_id,
      doctor_id: null,
    });

    await newAppointment.save();

    const newMessage = new Message({
      appointment_id: newAppointment._id,
      sender_id: user_id,
      message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ response: 'Appointment and message created successfully', appointment: newAppointment, message: newMessage }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = 'force-dynamic';
