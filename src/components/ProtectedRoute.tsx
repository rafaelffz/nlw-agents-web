import { Navigate, Outlet } from "react-router-dom";
import { useAuthSession } from "@/http/use-auth-session";

export function ProtectedRoute() {
  const { data: session, isLoading } = useAuthSession();

  if (isLoading) {
    return null;
  }

  if (!session?.data) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
}
