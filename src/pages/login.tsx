/** biome-ignore-all lint/performance/noImgElement: it's not a next project */

import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Loader2, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import z from "zod/v4";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions, useAuthSession } from "@/http/use-auth-session";
import loginImg from "../assets/login.png";
import logo from "../assets/logo.svg";

const roomIdSchema = z.object({
  roomId: z.uuid({ error: "Código da sala inválido" }),
});

type RoomIdFormData = z.infer<typeof roomIdSchema>;

export function Login() {
  const { data: session, isFetching } = useAuthSession();
  const { signIn } = useAuthActions();
  const navigate = useNavigate();

  const form = useForm<RoomIdFormData>({
    resolver: zodResolver(roomIdSchema),
    defaultValues: {
      roomId: "",
    },
  });

  function handleJoinRoom({ roomId }: RoomIdFormData) {
    navigate(`/room/${roomId}`, { replace: true });
    form.reset();
  }

  return session?.data?.user ? (
    <Navigate replace to={"/"} />
  ) : (
    <div className="grid h-dvh grid-cols-1 place-items-center lg:grid-cols-2">
      <div className="hidden size-full overflow-hidden lg:block">
        <img alt="Login" className="size-full" src={loginImg} />
      </div>

      <div className="flex size-full max-w-md flex-col items-center justify-center p-8">
        <div className="mb-14 flex items-center justify-center">
          <img alt="Login" className="h-16" src={logo} />
        </div>

        <div className="flex w-full flex-col gap-4 text-center">
          <h1 className="text-center font-bold text-3xl text-foreground">Bem-vindo!</h1>
          <p className="text-muted-foreground">Faça login para criar e acessar suas salas</p>
          <Button className="w-full cursor-pointer" onClick={() => signIn("github")} size={"lg"}>
            {isFetching ? (
              <div className="animate-spin">
                <Loader2 />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Github /> Entrar com GitHub
              </div>
            )}
          </Button>
        </div>

        <div className="relative my-6 flex w-full items-center justify-center overflow-hidden">
          <Separator />
          <div className="whitespace-nowrap bg-background px-4 text-center text-muted-foreground text-sm">
            ou entre em uma sala
          </div>
          <Separator />
        </div>

        <div className="w-full">
          <Form {...form}>
            <form className="flex w-full flex-col gap-4" onSubmit={form.handleSubmit(handleJoinRoom)}>
              <FormField
                control={form.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full py-6" placeholder="Digite o código da sala" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full cursor-pointer" size={"lg"} type="submit">
                Entrar na Sala <LogIn />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
