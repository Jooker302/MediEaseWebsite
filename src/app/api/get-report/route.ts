import connectMongo from '@/libs/MongoDB';
import UserReport from '@/models/UserReport';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  await connectMongo();

  try {
    const { report_id } = await req.json();

    if (!report_id) {
      return new NextResponse(JSON.stringify({ message: 'report_id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const report = await UserReport.findOne({ _id: report_id });

    if (!report) {
      return new NextResponse(JSON.stringify({ message: 'No report record found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new NextResponse(JSON.stringify({ data: report }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const dynamic = 'force-dynamic';
