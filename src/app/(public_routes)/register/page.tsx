"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] =  useState<File | null>(null);
  const [submitButton, setsubmitButton] = useState(true);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitButton) {
      setsubmitButton(false);
      var fields = true;
      if (email == "") {
        toast.error("Email is Required");
        fields = false;
      }
      if (name == "") {
        toast.error("Name is Required");
        fields = false;
      }
      if (password == "") {
        toast.error("Password is Required");
        fields = false;
      }
      if (repeatPassword == "") {
        toast.error("Repeat Password is Required");
        fields = false;
      }
      if (gender == "") {
        toast.error("Gender is Required");
        fields = false;
      }
      if (age == "") {
        toast.error("Age is Required");
        fields = false;
      }
      if (repeatPassword != password) {
        toast.error("Password Don't Match");
        fields = false;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("repeatPassword", repeatPassword);
      formData.append("gender", gender);
      formData.append("age", age);
      if (image) {
        formData.append("image", image);
      }
      // formData.append("image", image);

      if (fields) {
        try {
          const response = fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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
          })
            .then((response) => {
              setsubmitButton(true);
              setName("");
              setEmail("");
              setPassword("");
              setRepeatPassword("");
              setGender("");
              setAge("");
              setImage(null);
            })
            .catch((error) => {
              setsubmitButton(true);

              console.error("Error:", error);
            });

          toast.promise(response, {
            loading: "Adding user...",
            success: "User added successfully",
            error: "Error adding user",
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } else {
      toast.error("Wait");
    }
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Doctor Registration</h2>
            <form
              onSubmit={handleSubmit}
              className="register-form"
              id="register-form"
            >
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
