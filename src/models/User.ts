import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    age: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        dafault: "",
    }
})

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;