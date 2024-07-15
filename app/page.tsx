import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center gap-4">
      <Link href={'/sign-up'}>Get started</Link>
      <Link href={'/sign-in'}>Sign In</Link>
    </div>
  )
}
