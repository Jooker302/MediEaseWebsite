import mongoose from "mongoose";

const MongoDB = async () => {

        if (!process.env.MONGOURI) {
            throw new Error("MONGOURI environment variable is not defined");
        }

        await mongoose.connect(process.env.MONGOURI);

        // console.log("MongoDB connected successfully");
    
};

export default MongoDB;
