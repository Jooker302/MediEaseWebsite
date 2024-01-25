import type { NextAuthOptions } from "next-auth";
import { NextApiRequest } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import MongoDB from "@/libs/MongoDB";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import { Session } from 'next-auth';

// import Router from 'next/router'

// interface SessionData {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//     image: string;
//   };

// }


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
          // return new Response(JSON.stringify({ message: "User Not Found!" }), { status: 400 });
        }
        if (user.role !== "Admin"){
          // return new Response(JSON.stringify({ message: "User Not Found!" }), { status: 400 });
          throw new Error("Admin Allowed Only");
          // Router.push('/403')
          // return new Response(JSON.stringify({ message: "User Registered Success!" }), { status: 200 });
          // notFound()
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          // return new Response(JSON.stringify({ message: "User Not Found!" }), { status: 400 });
          throw new Error("Invalid Password");

        }



        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {

     
      if (user && 'role' in user) {
        token.role = user.role;
      }

      if (trigger === 'update' || session?.role || session?.name || session?.email) {
        console.log("Trigger update")
        token.email = session.email
        token.firstName = session.name
        token.role = session.role
      }

      return token
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        const email = session.user.email;
        try {
          await MongoDB();
          const sessionUser = await User.findOne({ email });
          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
            session.user.name = sessionUser.name;
            session.user.email = sessionUser.email;
            session.user.role = sessionUser.role;
          }
        } catch (error) {
          console.error("Error fetching user session data from the database: ", error);
        }
      }
    
      return session;
    }
    
  },

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'jwt'
  }
};
