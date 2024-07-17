import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="p-5 mt-9">
      <h2 className="mb-4">Welcome to the Admin panel for the blog page</h2>
        <div className="">
           <Link href={'/create'}>
           <Button>Create new post</Button>
           </Link>
        </div>
        {/* <div className="flex items-center gap-4">
      <Link href={'/sign-up'}>Get started</Link>
      <Link href={'/sign-in'}>Sign In</Link>
    </div>   */}
    </section>
  )
}
