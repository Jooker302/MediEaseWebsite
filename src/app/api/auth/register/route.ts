import MongoDB from '@/libs/MongoDB';
import User from "@/models/User";
import bcrypt from 'bcryptjs';
// import bcrypt from 'bcryptjs';
// import { Agent } from 'https';

// import { extractUsername } from "@/utils/utilityFunction";

export const POST = async (req: any) => {
  const {
    password, image, email, age, gender, role, name,
  } = await req.json();

  try {
   
    await MongoDB();

    const user = await User.findOne({ email });
    if (user !== null) {
      return new Response(JSON.stringify({ message: "Email Already Exists!" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      age,
      role,
      gender,
      password: hashedPassword,
      image,
    });

    await newUser.save();

    

    return new Response(JSON.stringify({ message: "User Registered Success!" }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Failed to create User" }), { status: 500 });
  }
};