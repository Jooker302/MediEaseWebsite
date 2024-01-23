import React from "react";
import '../../../public/auth/css/style.css';
import '../../../public/auth/fonts/material-icon/css/material-design-iconic-font.min.css';
import { Toaster } from "react-hot-toast";

function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
      
        <div className="main">
        {children}
        <Toaster position="top-right"/>
        </div>
      
  );
}

export default AuthLayout;
