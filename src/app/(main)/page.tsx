"use client";
import { redirect } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { useUser } from "@stackframe/stack";

export const dynamic = "force-static";

export default function Page() {
  const user = useUser();

  // If user is authenticated, redirect to their dashboard
  if (user) {
    redirect(`/dashboard/${user.id}`);
  }

  return <HomePage />;
}
