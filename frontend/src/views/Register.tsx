import { useState } from "react";
import { useAuthStore } from "../stores/auth";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("raul.iqbal@vensys.co.id");
  const [password, setPassword] = useState("@Rauliqbal");
  const [confirmPassword, setConfirmPassword] = useState("@Rauliqbal");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   try {
     await register(name, email, password, confirmPassword);
    navigate("/dashboard");
    toast.success("Registration was successful");
   } catch {
    toast.error("Registration failed. Please try again.");
   }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-2xl p-4 md:p-6 lg:p-10 border rounded-xl bg-white">
        <h2 className="text-2xl font-bold mb-2">CMS Dashboard Register</h2>
        <p className="text-gray-400">Register Account for your content management system.</p>
        <div className="mt-6">
          <label className="text-sm" htmlFor="name">Name</label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rauliqbal" />
        </div>
        <div className="mt-6">
          <label className="text-sm" htmlFor="email">Email</label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
        </div>
        <div className="mt-5">
          <label className="text-sm" htmlFor="password">Password</label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="**** ****" />
        </div>
        <div className="mt-5">
          <label className="text-sm" htmlFor="confirmPassword">Confirm Password</label>
          <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="**** ****" />
        </div>
        <Button className="w-full mt-4" type="submit">Sign in</Button>
      </form>
    </div>
  );
}
