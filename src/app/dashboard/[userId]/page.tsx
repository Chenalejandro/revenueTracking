import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack";
import { UserDashboard } from "./user-dashboard";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in?callbackUrl=/dashboard/" + userId);
  }

  // If user is trying to access someone else's profile, redirect to their own
  if (user.id !== userId) {
    redirect(`/dashboard/${user.id}`);
  }

  return <UserDashboard />;
}
