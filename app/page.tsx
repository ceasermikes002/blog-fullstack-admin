"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/Header";
import { useAuth } from "@clerk/nextjs";



export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  if (!isLoaded || !userId) {
    return null;
  }


  return (
    <div className="">
          <Header />
    <section className="p-5 mt-9 items-center justify-center flex flex-col min-h-96">
      <h2 className="m-10" suppressHydrationWarning>
        {greeting} {user ? user.firstName : "Guest"}, welcome to the admin panel for Diella&apos;s blog</h2>
      <div className="flex gap-4">
        <Link href={'/create'}>
          <Button>Create new post</Button>
        </Link>
        <Link href={'/dashboard'}>
          <Button>View dashboard</Button>
        </Link>
      </div>
    </section>
    </div>
  );
}

