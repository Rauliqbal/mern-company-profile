// src/pages/Login.tsx
import { useState } from "react";
import { useAuthStore } from "../stores/auth";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("raul.iqbal@vensys.co.id");
  const [password, setPassword] = useState("@Rauliqbal");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard")
    } catch {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-2xl p-4 md:p-6 lg:p-10 border rounded-xl bg-white">
        <h2 className="text-2xl font-bold mb-2">CMS Dashboard Login</h2>
        <p className="text-gray-400">Access your content management system.</p>
      <div className="mt-6">
        <label className="text-sm" htmlFor="email">Email</label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com"/>
      </div>
      <div className="mt-5">
        <label className="text-sm" htmlFor="password">Password</label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="john@example.com"/>
      </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button className="w-full mt-4" type="submit">Sign in</Button>
      </form>
    </div>
  );
}
