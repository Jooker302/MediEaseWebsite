import connectMongo from '@/libs/MongoDB';
import Message from '@/models/Message';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  await connectMongo();

  try {
    const { user_id, appointment_id } = await req.json();

    if (!user_id || !appointment_id) {
      return new NextResponse(JSON.stringify({ message: 'user_id and appointment_id are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const messages = await Message.find({
      sender_id: user_id,
      appointment_id: appointment_id,
    });

    const formattedMessages = messages.map(message => ({
      id: message._id,
      sender_id: message.sender_id,
      message: message.message,
      created_at: message.created_at,
    }));

    return new NextResponse(JSON.stringify({ data: formattedMessages }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = 'force-dynamic';
