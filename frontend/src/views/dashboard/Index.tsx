import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl">Welcome, {user.name}</h1>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
