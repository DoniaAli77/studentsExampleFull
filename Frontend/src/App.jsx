import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import UserEdit from "./pages/UserEdit";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseEdit from "./pages/CourseEdit";
import MyCourses from "./pages/MyCourses";
import {ProtectedRoute} from "./auth/ProtectedRoutes";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Protected Routes with Layout and Nested Children */}
        <Route path="/" element={
          <ProtectedRoute allowedRoles={["admin", "student"]}>
            <Layout />
          </ProtectedRoute>
        }>
          {/* Index Route */}
          <Route index element={<Dashboard />} />

          {/* Users (admin only) */}
          <Route path="users">
            <Route index element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            } />
            <Route path=":id" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserDetail />
              </ProtectedRoute>
            } />
            <Route path=":id/edit" element={
              <ProtectedRoute allowedRoles={["admin", "student"]}>
                <UserEdit />
              </ProtectedRoute>
            } />
          </Route>

          {/* Courses (admin + student) */}
          <Route path="courses">
            <Route index element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Courses />
              </ProtectedRoute>
            } />
            <Route path=":id" element={
              <ProtectedRoute allowedRoles={["admin", "student"]}>
                <CourseDetail />
              </ProtectedRoute>
            } />
            <Route path=":id/edit" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CourseEdit />
              </ProtectedRoute>
            } />
          </Route>

          {/* My Courses (student only) */}
          <Route path="my-courses" element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyCourses />
            </ProtectedRoute>
          } />
        </Route>

        {/* Wildcard Route */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
