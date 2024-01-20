import React from "react";
import '../../../public/auth/css/style.css';
import '../../../public/auth/fonts/material-icon/css/material-design-iconic-font.min.css';

function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
      
        <div className="main">
        {children}
        </div>
      
  );
}

export default AuthLayout;
