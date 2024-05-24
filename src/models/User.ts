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
    role: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    }
});

const User = models?.User || model("User", UserSchema);

export default User;
