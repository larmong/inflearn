import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Tutorial",
  description: "next 공부중!",
};

export default function Home() {
  return (
    <main>
      Home
      <br />
      <a href="/dashboard">Go To Dashboard</a>
      <br />
      <Link href="/dashboard">Go To Dashboard</Link>
    </main>
  );
}
