// import dynamic from 'next/dynamic';
// pages/api/users.js
import MongoDB from '@/libs/MongoDB';
import User from '@/models/User';
import { NextRequest } from 'next/server';
// import User from '@/models/User';

export const GET = async ( request: NextRequest,{ params }: { params: any }) => {
  await MongoDB();
    // console.log("", params);
    // console.log("User ID:", user_id);
  try {
    const user = await User.findOne({ _id:params.id});

    
    return new Response(JSON.stringify({ data: user }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return new Response(JSON.stringify({ data: user_reports }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic =  'force-dynamic';
