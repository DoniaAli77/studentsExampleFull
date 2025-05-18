import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-lg font-semibold">Portal Dashboard</h1>
        <nav className="space-x-8">
          <Link to="/">Home</Link>
          {user?.role === "admin" && <Link to="/users">Users</Link>}
          {user?.role === "admin" && <Link to="/courses">Courses</Link>}
          {user?.role === "student" && <Link to="/my-courses">My Courses</Link>}
          <button onClick={logout} className="underline">Logout</button>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
