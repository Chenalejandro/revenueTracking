"use client";
import { SignInButton } from "@/components/auth/sign-in-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar, useUser } from "@stackframe/stack";
import Link from "next/link";

export default function UserButton() {
  const user = useUser();
  if (!user) {
    return <SignInButton />;
  }
  return (
    <>
      <UserIcon
        email={user.primaryEmail}
        profileImageUrl={user.profileImageUrl}
        displayName={user.displayName}
      ></UserIcon>
    </>
  );
}

export function UserIcon({
  email,
  profileImageUrl,
  displayName,
}: {
  email: string | null;
  profileImageUrl: string | null;
  displayName: string | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm-icon" className="flex-none rounded-full">
          <UserAvatar
            user={{ primaryEmail: email, displayName, profileImageUrl }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{displayName ?? email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/handler/account-settings">
              <Settings className="mr-2 h-5 w-5" />
              <span>Configuraciones</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
