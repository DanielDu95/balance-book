import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthBackground from "../components/ui/AuthBackground"; // 👈 import background
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.success("Logged in!");
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AuthBackground /> {/* 👈 background layer */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-background-1  p-8 rounded-xl shadow-lg w-full max-w-sm backdrop-blur-md bg-opacity-80 "
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 mb-4 rounded-md border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 mb-6 rounded-md border "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
