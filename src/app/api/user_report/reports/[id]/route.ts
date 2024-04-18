// import dynamic from 'next/dynamic';
// pages/api/users.js
import MongoDB from '@/libs/MongoDB';
import UserReport from '@/models/UserReport';
import { NextRequest } from 'next/server';
// import User from '@/models/User';

export const GET = async ( request: NextRequest,{ params }: { params: any }) => {
  await MongoDB();
    // console.log("", params);
    // console.log("User ID:", user_id);
  try {
    const user_reports = await UserReport.find({ user_id:params.id});

    const formatted_user_reports = user_reports.map(report => ({
      id: report._id,
      title: report.label,
      date: formatDate(report.created_at), // Assuming formatDate is a function to format the date
      image: `require('../images/default_user_profile.jpg')`,
    }));
    return new Response(JSON.stringify({ data: formatted_user_reports }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return new Response(JSON.stringify({ data: user_reports }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

function formatDate(date: string) {
  const formattedDate = new Date(date).toISOString().split('T')[0];
  return formattedDate;
}

export const dynamic =  'force-dynamic';
