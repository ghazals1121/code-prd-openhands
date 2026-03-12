import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = async () => { await login(email, password); navigate("/dashboard"); };
  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 mb-4" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 mb-4" />
      <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </div>
  );
}
