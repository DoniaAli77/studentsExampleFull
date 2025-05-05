import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/register", form);
      alert("Registration successful. Please log in.");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-3">
      <input placeholder="Name" className="border p-2 w-full" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" className="border p-2 w-full" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" className="border p-2 w-full" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
      <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="border p-2 w-full">
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
