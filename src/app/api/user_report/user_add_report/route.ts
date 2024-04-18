import { NextApiRequest } from "next";
// import dynamic from 'next/dynamic';
// pages/api/users.js
import MongoDB from "@/libs/MongoDB";
import User from "@/models/User";
import UserReport from "@/models/UserReport";

export const POST = async (req: any) => {
  // console.log("Testing");
  try {
    const {
      user_id,
      label,
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

    const requiredFields = [
      user_id,
      label,
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
    ];

    // console.log(requiredFields);

    if (requiredFields.some((field) => field === null || field === undefined)) {
      // If any required field is null, return error response
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "ap plication/json" } }
      );
    }

    const data = {
      user_id,
      label,
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

    // console.log(data);

    // // Make the POST request to the prediction API
    // const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
    //   method: "POST",
    //   headers: {
    //   },
    //   body: JSON.stringify(data),
    // });

    // console.log("Result :", predictionResponse);
    // if (!predictionResponse.ok) {
    //   throw new Error("Failed to get prediction from the external API");
    // }

    // Extract the prediction result from the response
    // const predictionResult = await predictionResponse.json();

    //   console.log("Result :", predictionResult);
    await MongoDB();


    const newUserReport = new UserReport({
      user_id: user_id,
      label: label,
      age: age,
      hypertension: hypertension,
      heart_disease: heart_disease,
      bmi: bmi,
      HbA1c_level: HbA1c_level,
      blood_glucose_level: blood_glucose_level,
      gender_Female: gender_Female,
      gender_Male: gender_Male,
      gender_Other: gender_Other,
      smoking_history_No_Info: smoking_history_No_Info,
      smoking_history_current: smoking_history_current,
      smoking_history_ever: smoking_history_ever,
      smoking_history_former: smoking_history_former,
      smoking_history_never: smoking_history_never,
      smoking_history_not_current: smoking_history_not_current,
      // created_at: Date.now(),
    });

    newUserReport.save()
  .then((savedUserReport: any) => {
    console.log('User report saved successfully:', savedUserReport);
    // Handle success, if needed
  })
  .catch((error: Error) => {
    console.error('Error saving user report:', error);
    // Handle error, if needed
  });

    return new Response(
      JSON.stringify({
        message: "User Report Saved",
        // prediction: "",  
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const dynamic = "force-dynamic";
