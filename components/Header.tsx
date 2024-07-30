import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";

export default function Header() {
  const { signOut } = useClerk();

  return (
    <header className="flex justify-between p-5">
      <Link href={'/'} className="">HEADER COMPONENT</Link>
      <div className="flex gap-4">
        <SignedOut>
          <Link href={'/sign-up'}><Button>Get Started</Button></Link>
          <Link href={'/sign-in'}><Button>Login</Button></Link>
        </SignedOut>
        <SignedIn>
        <Button onClick={() => signOut()}>Sign Out</Button>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
