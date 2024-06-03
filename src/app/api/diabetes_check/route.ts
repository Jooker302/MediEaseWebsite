import { NextApiRequest } from "next";
// import dynamic from 'next/dynamic';
// pages/api/users.js
import MongoDB from "@/libs/MongoDB";
import User from "@/models/User";

export const POST = async (req: any) => {
  try {
    const {
      age,
      hypertension,
      heart_disease,
      bmi,
      HbA1c_level,
      blood_glucose_level,
      gender_Female,
      gender_Male,
      gender_Other,
      smoking_history_No_Info,
      smoking_history_current,
      smoking_history_ever,
      smoking_history_former,
      smoking_history_never,
      smoking_history_not_current,
    } = await req.json();

    const data = {
      age,
      hypertension,
      heart_disease,
      bmi,
      HbA1c_level,
      blood_glucose_level,
      gender_Female,
      gender_Male,
      gender_Other,
      "smoking_history_No Info": smoking_history_No_Info,
      smoking_history_current,
      smoking_history_ever,
      smoking_history_former,
      smoking_history_never,
      "smoking_history_not current": smoking_history_not_current,
    };

      console.log(data);

    // Make the POST request to the prediction API
    const predictionResponse = await fetch("https://flutterdevelopers.tech/python/predict/diabetes", {
      method: "POST",
      headers: {
        // 'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    // console.log("Result :", predictionResponse);
    if (!predictionResponse.ok) {
      throw new Error("Failed to get prediction from the external API");
    }

    // Extract the prediction result from the response
    const predictionResult = await predictionResponse.json();

    //   console.log("Result :", predictionResult);

    return new Response(JSON.stringify({ message: 'Prediction received and processed successfully', prediction: predictionResult }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = "force-dynamic";
