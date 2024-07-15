import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";


export default function Header() {
  return (
    <header className=" flex justify-between p-5">
      <div className="">HEADER COMPONENT</div>
      <div className="flex gap-4">
        <Link href={'/sign-up'}><Button>Get Started</Button></Link>
        <Link href={'/sign-in'}><Button>Login</Button></Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
