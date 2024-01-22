import React from "react";
import '../../../public/error/css/error.css';
// import '../../../public/error/js/error';
import Script from "next/script";

function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
      
        <div>
        {children}
        <Script src="/error/js/error.js" />
        </div>
      
  );
}

export default AuthLayout;
