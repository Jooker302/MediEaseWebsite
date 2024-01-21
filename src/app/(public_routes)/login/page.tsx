"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"
import { Props } from "react-apexcharts";
// import { Props } from "next/dist/client/script";
// import { useSession } from "next-auth/react";
// import SignInImage as '../../../public/auth/images/signin-image.jpg';

function Login(props : Props) {
  // const session = useSession();
  // console.log(session)
  // if(session.data === null){
  //   console.log("working")
  // }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const result = await signIn("credentials",{
      email : email,
      password: password,
      redirect: true,
      callbackUrl: props.callBackUrl ?? "http://localhost:3000/",
    });



    // console.log(result);
  };

  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <Image
                src="/auth/images/signin-image.png"
                width={500}
                height={500}
                alt="Sign Up Project"
                priority={true}
              />
            </figure>
            
            <Link href="/register" style={{ ["color" as any]: "#ffffff" }}>Doctor Registration</Link>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign In</h2>
            <form onSubmit={handleSubmit}
              className="register-form"
              id="login-form">
              <div className="form-group">
                <label htmlFor="your_name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="your_pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="your_pass"
                  id="your_pass"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Log in"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
