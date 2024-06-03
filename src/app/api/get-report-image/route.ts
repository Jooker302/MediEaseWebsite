import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';

interface ParsedData {
  age?: string;
  hypertension?: string;
  heartDisease?: string;
  bloodGlucoseLevel?: string;
  hba1cLevel?: string;
  gender?: string;
  bmi?: string;
  smokingHistory?: string;
  [key: string]: string | undefined;
}

const parseBloodReport = (text: string): ParsedData => {
  const lines = text.split('\n');
  const result: ParsedData = {};

  lines.forEach(line => {
    let match;
    if (line.includes('Age')) {
      match = line.match(/Age\s*:\s*(\d+)/);
      if (match) result.age = match[1];
    }
    if (line.includes('Hypertension')) {
      match = line.match(/Hypertension\s*:\s*([\d.]+)/);
      if (match) result.hypertension = match[1];
    }
    if (line.includes('Heart Disease')) {
      match = line.match(/Heart Disease\s*:\s*([\d,]+)/);
      if (match) result.heartDisease = match[1].replace(',', '');
    }
    if (line.includes('Blood Glucose Level')) {
      match = line.match(/Blood Glucose Level\s*:\s*([\d,]+)/);
      if (match) result.bloodGlucoseLevel = match[1].replace(',', '');
    }
    if (line.includes('hba1c Level')) {
      match = line.match(/hba1cLevel\s*:\s*([\d,]+)/);
      if (match) result.hba1cLevel = match[1].replace(',', '');
    }
    if (line.includes('gender')) {
      match = line.match(/gender\s*:\s*([\d,]+)/);
      if (match) result.gender = match[1].replace(',', '');
    }
    if (line.includes('bmi')) {
      match = line.match(/bmi\s*:\s*([\d,]+)/);
      if (match) result.bmi = match[1].replace(',', '');
    }
    if (line.includes('Smoking History')) {
      match = line.match(/Smoking History\s*:\s*([\d,]+)/);
      if (match) result.smokingHistory = match[1].replace(',', '');
    }
    // Add more fields as needed
  });

  return result;
};

const performOCRAndParse = async (imagePath: string) => {
  try {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(imagePath);
    await worker.terminate();

    const parsedData = parseBloodReport(text);

    return parsedData;
  } catch (error) {
    console.error('Error during OCR and parsing:', error);
    throw error;
  }
};

export async function POST(req: Request) {
  try {
    const responseData = await req.json();
    const { user_id, image } = responseData;
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    try {
      const outputBuffer = await sharp(buffer)
        .greyscale()
        .toBuffer();

      console.log('Image preprocessed');

      const processedImagePath = path.join(process.cwd(), 'public', `processed_report_${user_id}.jpg`);
      fs.writeFileSync(processedImagePath, outputBuffer);
      console.log('Image saved at:', processedImagePath);

      const parsedData = await performOCRAndParse(processedImagePath);

      fs.unlinkSync(processedImagePath);
      console.log('Processed image deleted');

      return new NextResponse(JSON.stringify({ data: parsedData }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error('Error during image preprocessing:', err);
      return new NextResponse(JSON.stringify({ error: 'Error during image preprocessing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return new NextResponse(JSON.stringify({ error: 'Invalid request data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Adjust the limit if necessary
    },
  },
};

export const dynamic = 'force-dynamic';
