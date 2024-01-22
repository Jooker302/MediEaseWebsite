// pages/api/users.js
import MongoDB from '@/libs/MongoDB';
import User from '@/models/User';

export const GET = async () => {
  await MongoDB();

  try {
    const users = await User.find({});
    return new Response(JSON.stringify({ data: users }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
