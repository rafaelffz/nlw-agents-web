import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";
import { authClient } from "@/lib/auth";

export function CreateRoom() {
  const { data: session } = authClient.useSession();

  return (
    <div className="px-4">
      <div className="mx-auto max-w-4xl">
        <div>
          <h1 className="mb-2 font-medium text-4xl">Olá, {session?.user?.name ? session.user.name : "usuário"}!</h1>
        </div>
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />

          <RoomList />
        </div>
      </div>
    </div>
  );
}
