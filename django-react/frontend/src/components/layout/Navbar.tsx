import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
export function Navbar() {
  const { token, logout } = useAuthStore();
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">Grand Hotel</Link>
      <div className="flex gap-4">
        <Link to="/rooms">Rooms</Link>
        {token ? <><Link to="/dashboard">Dashboard</Link><button onClick={logout}>Logout</button></> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
}
