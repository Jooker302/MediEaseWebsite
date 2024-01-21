"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = useSession();
  console.log(session.data?.user);
  if(session.data === null){
  // console.log(session)
  }
  return (
    
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
     
  );
}
