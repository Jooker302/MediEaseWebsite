import React from "react";
import Image from "next/image";
import Link from "next/link"
// import SignInImage as '../../../public/auth/images/signin-image.jpg';

function Login() {
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
              />
            </figure>
            
            <Link href="/register" style={{ ["color" as any]: "#ffffff" }}>Doctor Registration</Link>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign In</h2>
            <form method="POST" className="register-form" id="login-form">
              <div className="form-group">
                <label htmlFor="your_name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="your_name"
                  id="your_name"
                  placeholder="Your Name"
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
