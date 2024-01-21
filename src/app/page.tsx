"use client";

import React from 'react'
import { useSession } from "next-auth/react";

type Props = {}

const Auth = (props: Props) => {
   const session = useSession();
  console.log(session)
  if(session.data === null){
    // console.log("working")
  }
  return (
    <div>page</div>
  )
}

export default Auth;