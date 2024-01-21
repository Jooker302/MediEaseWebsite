import type { NextAuthOptions } from "next-auth";
import { NextApiRequest } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import MongoDB from "@/libs/MongoDB";
import User from "@/models/User";



export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials){
         return null; 
        }

        const { email, password } = credentials;

        await MongoDB();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not registered");
        }



        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },
};
