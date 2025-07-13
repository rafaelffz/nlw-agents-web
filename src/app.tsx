import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/scroll-to-top";
import { CreateRoom } from "./pages/create-room";
import { Login } from "./pages/login";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Room } from "./pages/room";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Header />} path="/">
            <Route element={<Navigate replace to="/" />} path="/room" />
            <Route element={<Room />} path="/room/:roomId" />

            <Route element={<ProtectedRoute />}>
              <Route element={<CreateRoom />} index />
              <Route element={<RecordRoomAudio />} path="/room/:roomId/audio" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
