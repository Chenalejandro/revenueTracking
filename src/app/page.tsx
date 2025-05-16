import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack";
import { HomePage } from "@/components/home-page";

export default async function Page() {
  const user = await stackServerApp.getUser();

  // If user is authenticated, redirect to their dashboard
  if (user) {
    redirect(`/dashboard/${user.id}`);
  }

  return <HomePage />;
}
