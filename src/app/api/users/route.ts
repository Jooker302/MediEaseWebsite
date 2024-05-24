import MongoDB from '@/libs/MongoDB';
import User from '@/models/User';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  await MongoDB();

  try {
    // Check if the request has a query parameter `id`
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const user = await User.findById(id);

      if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ id: user._id, name: user.name }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      const users = await User.find({ role: 'Patient' });
      return new Response(JSON.stringify({ data: users }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = 'force-dynamic';
