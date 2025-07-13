import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { CreateRoom } from "./pages/create-room";
import { Login } from "./pages/login";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Room } from "./pages/room";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />

          <Route element={<ProtectedRoute />}>
            <Route element={<Header />} path="/">
              <Route element={<CreateRoom />} index />
              <Route element={<Room />} path="/room/:roomId" />
              <Route element={<RecordRoomAudio />} path="/room/:roomId/audio" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
