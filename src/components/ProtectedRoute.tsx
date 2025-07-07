// components/ProtectedRoute.tsx
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "./ui/Spinner";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuthContext();

  if (loading) return <Spinner />;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
