import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    role: "student",
  });
  const [message, setMessage]=useState('')
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/register", form);
      setMessage("Registration successful. redirect to login .....");
      setTimeout(()=>navigate('/login'),2000)
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-3">
      <h1>Welcome Please register</h1>
      <br/>
      <label>Name </label>
      <input
        placeholder="Name"
        className="border p-2 w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />
      <label>Age </label>

      <input
        placeholder="Age"
        className="border p-2 w-full"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <br />
      <label>Email </label>

      <input
        placeholder="Email"
        className="border p-2 w-full"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />
      <label>Password    </label>

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br />
      <label>Role    </label>

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="border p-2 w-full"
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <br/>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Register
      </button>
      <br/>
      <p>{message}</p>
    </form>
  );
}
