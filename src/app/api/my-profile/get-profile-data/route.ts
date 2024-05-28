import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import MongoDB from "@/libs/MongoDB";
import User from "@/models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Connect to MongoDB
  await MongoDB();

  try {
    const { email, name, password, confirmPassword } = req.body;

    // Validate input
    if (!email || !name || (password && password !== confirmPassword)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    user.name = name;
    user.email = email;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
