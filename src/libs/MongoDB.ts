import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import User from "@/models/User";
// import bcrypt

const MongoDB = async () => {

        if (!process.env.MONGOURI) {
            throw new Error("MONGOURI environment variable is not defined");
        }

        await mongoose.connect(process.env.MONGOURI);

        // console.log("MongoDB connected successfully");
        const user = await User.findOne({ email :"admin@gmail.com"});

        if (!user) {
            // console.log("MongoDB connected");
            const password = 'admin123';
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
              email: "admin@gmail.com",
              name: "Admin",
              age: "20",
              role: "Admin",
              gender: "Male",
              password: hashedPassword,
              image: null,
            });
            await newUser.save();
        }
    
};

export default MongoDB;
