// import { useAuthStore } from "../../stores/auth";
import { useEffect } from "react";
import { useUserStore } from "../../stores/user";

export default function Dashboard() {
  const { user, fetchUser, isLoading } = useUserStore();

  useEffect(() => {
    if (!user) {
      void fetchUser();
    }
  }, [fetchUser, user]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;
  return (
    <div className="px-0 lg:px-6">
      <h1 className="text-xl">Welcome,{user?.name}</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Welcome Back 👋</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl shadow">Card 1</div>
          <div className="p-4 bg-white rounded-xl shadow">Card 2</div>
          <div className="p-4 bg-white rounded-xl shadow">Card 3</div>
        </div>
      </div>
    </div>
  );
}
