import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [users]);
  async function handledelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/users/${id}`,
        { withCredentials: true }
      );
      alert(response.data);
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="p-4">
      <h1 className="text-lg mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="flex justify-between items-center mb-2">
            <div>
              <span className="font-semibold">{user.name}</span> - {user.role} -
              <Link
                to={`/users/${user._id}`}
                className="text-blue-500 ml-2 underline"
              >
                View
              </Link>
              <button onClick={() => handledelete(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
