import MongoDB from "@/libs/MongoDB";
import User from "@/models/User";
import bcrypt from 'bcryptjs';


export const POST =async (req : any) => {
    const {
        password, email,
      } = await req.json();

      if (!email || !password) {
        return new Response(JSON.stringify({ message: "All fields are required." }), { status: 400 });
      }

      try {
   
        await MongoDB();
    
        const user = await User.findOne({ email });
        if (!user) {
          return new Response(JSON.stringify({ message: "Email Doesn't Exists!" }), { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return new Response(JSON.stringify({ message: "User Not Found!" }), { status: 400 });
        //   throw new Error("Invalid Password");
        }

        return new Response(JSON.stringify({ message: "User Found!", user: user  }), { status: 200 });


    }catch(err){
        return new Response(JSON.stringify({ message: "Some Error Occured!" }), { status: 400 });
    }
}