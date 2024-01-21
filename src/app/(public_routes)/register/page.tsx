"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [gender, setGender] = useState(""); 
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e : any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Repeat Password:", repeatPassword);
    console.log("Gender:", gender);
    console.log("Age:", age);
    console.log("Image: ", image);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("repeatPassword", repeatPassword);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("image", image); 

    try {
      // Example handling response in client code
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    password,
    image,
    email,
    age,
    gender,
    role: "Doctor",
    name,
  }),
});

if (response.ok) {
  const responseData = await response.json();
  console.log(responseData);
} else {
  console.error('Error:', response.statusText);
}
} catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Doctor Registration</h2>
            <form onSubmit={handleSubmit} className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="re-pass">
                  <i className="zmdi zmdi-lock-outline"></i>
                </label>
                <input
                  type="password"
                  name="re_pass"
                  id="re_pass"
                  placeholder="Repeat your password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">
                  <i className="zmdi zmdi-calendar"></i>
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Your Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
              </div>
              <div className="form-group">
                <label htmlFor="">Female</label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
              </div>
              <div className="form-group">
                <label htmlFor="image">
                  <i className="zmdi zmdi-image"></i>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
             
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Register"
                />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure>
            
              <Image
                src="/auth/images/signin-image.png"
                width={500}
                height={500}
                alt="Sign Up Project"
                priority={true}
              />
            </figure>
            <Link href="/login" style={{ ["color" as any]: "#ffffff" }}>
              I am already member
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
