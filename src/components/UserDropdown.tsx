"use client";
import type { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function UserDropdown({ user }: { user?: User }) {
  function extractInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  }

  if (!user) return <div />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" asChild>
          <div className="flex h-min w-min items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>
                {extractInitials(user.name ?? "")}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start">
              <span className="text-sm">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => console.log(user)}>
          Logar user
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
