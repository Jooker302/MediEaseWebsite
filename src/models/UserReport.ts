import mongoose from "mongoose";

const UserReportSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    default: 0,
  },
  hypertension: {
    type: Number,
    default: 0,
  },
  heart_disease: {
    type: Number,
    default: 0,
  },
  bmi: {
    type: Number,
    default: 0,
  },
  HbA1c_level: {
    type: Number,
    default: 0,
  },
  blood_glucose_level: {
    type: Number,
    default: 0,
  },
  gender_Female: {
    type: Number,
    default: 0,
  },
  gender_Male: {
    type: Number,
    default: 0,
  },
  gender_Other: {
    type: Number,
    default: 0,
  },
  smoking_history_No_Info: {
    type: Number,
    default: 0,
  },
  smoking_history_current: {
    type: Number,
    default: 0,
  },
  smoking_history_ever: {
    type: Number,
    default: 0,
  },
  smoking_history_former: {
    type: Number,
    default: 0,
  },
  smoking_history_never: {
    type: Number,
    default: 0,
  },
  smoking_history_not_current: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const UserReport = mongoose.models?.UserReport || mongoose.model("UserReport", UserReportSchema);

// const UserReport = mongoose.model("UserReport", UserReportSchema);

export default UserReport;
