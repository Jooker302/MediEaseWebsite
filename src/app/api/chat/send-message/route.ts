import connectMongo from '@/libs/MongoDB';
import Message from '@/models/Message';

export const POST = async (req: any) => {
  try {
    await connectMongo();

    const { sender_id, appointment_id, message } = await req.json();

    if (!sender_id || !message || !appointment_id) {
      return new Response(JSON.stringify({ message: 'user_id and message are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const newMessage = new Message({
      appointment_id: appointment_id,
      sender_id: sender_id,
      message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: newMessage }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = 'force-dynamic';
