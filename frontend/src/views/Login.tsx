// src/pages/Login.tsx
import { useState } from "react";
import { useAuthStore } from "../stores/auth";
import { useNavigate } from "react-router";

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
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <h2 className="text-lg font-bold mb-3">Login</h2>
        <input
          className="border p-2 mb-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 mb-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}
