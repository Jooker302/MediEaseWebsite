import MongoDB from "@/libs/MongoDB";
import UserReport from "@/models/UserReport";

export const POST = async (req: any) => {
  try {

    const {
      userRecordId,
    } = await req.json();

    await MongoDB();

    const userReport = await UserReport.findOne({ _id: userRecordId });



    const data = {
      "Age": userReport.age,
      "Gender_Male": userReport.gender_Male,
      "Gender_Female": userReport.gender_Female,
      "BMI": userReport.bmi,
    };

    // Make the POST request to the prediction API
    const predictionResponse = await fetch("http://127.0.0.1:5000/predict/exercise", {
      method: "POST",
      headers: {
        // 'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    // console.log(predictionResponse);


    // console.log("Result :", predictionResponse);
    if (!predictionResponse.ok) {
      throw new Error("Failed to get prediction from the external API");
    }

    // // Extract the prediction result from the response
    const predictionResult = await predictionResponse.json();

      console.log("Result :", predictionResult[0]);
     
     

    return new Response(JSON.stringify({ message: 'Prediction received and processed successfully', prediction: predictionResult[0] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const dynamic = "force-dynamic";
