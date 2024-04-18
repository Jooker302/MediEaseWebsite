import { NextApiRequest } from "next";
// import dynamic from 'next/dynamic';
// pages/api/users.js
import MongoDB from "@/libs/MongoDB";
import User from "@/models/User";
import UserReport from "@/models/UserReport";

export const POST = async (req: any) => {
  try {
    const {
      userRecordId,
    } = await req.json();

    await MongoDB();
    // console.log("", params);
    // console.log("User ID:", user_id);

    const userReport = await UserReport.findOne({ _id: userRecordId });
    // console.log(userReport);
  


    const data = {
      age: userReport.age,
      hypertension: userReport.hypertension,
      heart_disease: userReport.heart_disease,
      bmi: userReport.bmi,
      HbA1c_level: userReport.HbA1c_level,
      blood_glucose_level: userReport.blood_glucose_level,
      gender_Female: userReport.gender_Female,
      gender_Male: userReport.gender_Male,
      gender_Other: userReport.gender_Other,
      "smoking_history_No Info": userReport.smoking_history_No_Info,
      smoking_history_current: userReport.smoking_history_current,
      smoking_history_ever: userReport.smoking_history_ever,
      smoking_history_former: userReport.smoking_history_former,
      smoking_history_never: userReport.smoking_history_never,
      "smoking_history_not current": userReport.smoking_history_not_current,
    };

      // console.log(data);

    // Make the POST request to the prediction API
    const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
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

    // // Extract the prediction result from the response
    const predictionResult = await predictionResponse.json();

      console.log("Result :", predictionResult[0]);
      var predictionQuery;
      if (predictionResult.length === 1 && predictionResult[0] === 0) {
        // Execute code if predictionResult is [0]
        predictionQuery = 'You don\'t have Diabetes';
        // console.log("Prediction result is 0");
      } else {
        // Execute code if predictionResult is not [0]
        predictionQuery = 'You have Diabetes';

        // console.log("Prediction result is not 0");
      }

    return new Response(JSON.stringify({ message: 'Prediction received and processed successfully', prediction: predictionQuery }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = "force-dynamic";
