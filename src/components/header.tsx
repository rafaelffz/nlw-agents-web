/** biome-ignore-all lint/performance/noImgElement: it's not a next project */

import { LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthActions, useAuthSession } from "@/http/use-auth-session";
import logo from "../assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const { data: session } = useAuthSession();
  const { signOut } = useAuthActions();
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <>
      {session?.data?.user && (
        <header className="fixed w-full border-border border-b bg-card">
          <div className="mx-auto flex items-center justify-between px-6 py-3">
            <img alt="Login" className="h-10" src={logo} />

            <div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage alt="User's Avatar" src={session?.data?.user.image as string | undefined} />
                    <AvatarFallback>{session?.data?.user.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-3">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <div>
                      <div>{session?.data?.user.name ? session.data.user.name : "Usuário"}</div>
                      <div className="text-muted-foreground text-xs">{session?.data?.user.email}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="group cursor-pointer" onClick={logOut}>
                    <div className="flex items-start gap-2">
                      <LogOut className="group-hover:text-destructive" />{" "}
                      <span className="group-hover:text-destructive">Log out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      )}
      <main className={`pb-10 ${session?.data?.user ? "pt-24" : "pt-10"}`}>
        <Outlet />
      </main>
    </>
  );
}
