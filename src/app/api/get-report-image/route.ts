import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import {createWorker} from 'tesseract.js';

interface ParsedData {
  age?: string;
  hemoglobin?: string;
  wbc?: string;
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
    if (line.includes('Hemoglobin')) {
      match = line.match(/Hemoglobin\s*:\s*([\d.]+)/);
      if (match) result.hemoglobin = match[1];
    }
    if (line.includes('WBC')) {
      match = line.match(/WBC\s*:\s*([\d,]+)/);
      if (match) result.wbc = match[1].replace(',', '');
    }
    // Add more fields as needed
  });

  return result;
};

const performOCRAndParse = async (imagePath: string) => {

  try {
    // const { data: { text } } = await Tesseract.recognize(
    //   imagePath,
    //   'eng',
    //   {
    //     logger: m => console.log(m), // Optional: log OCR progress
    //   }
    // );
    console.log(imagePath);
const worker = await createWorker('eng');
const { data: { text } } = await worker.recognize(imagePath);
await worker.terminate();
// console.log(text);
console.log("test");


    console.log('Extracted Text:', text);
    const parsedData = parseBloodReport(text);
    console.log('Parsed Data:', parsedData);
  } catch (error) {
    console.error('Error during OCR and parsing:', error);
  }
};

export const POST = async (req: any, res: NextApiResponse) => {
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

      // Save the processed image to a file (optional, can be removed if not needed)
      const processedImagePath = path.join(process.cwd(), 'public', `processed_report_${user_id}.jpg`);
      fs.writeFileSync(processedImagePath, outputBuffer);
      console.log('Image saved at:', processedImagePath);

      // Proceed with OCR after preprocessing is complete
      await performOCRAndParse(processedImagePath);

      // Respond with a success message
      // res.status(200).json({ message: 'OCR and parsing completed successfully' });
    } catch (err) {
      console.error('Error during image preprocessing:', err);
      // res.status(500).json({ error: 'Error during image preprocessing' });
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    // res.status(400).json({ error: 'Invalid request data' });
  }
};

export const dynamic =  'force-dynamic';