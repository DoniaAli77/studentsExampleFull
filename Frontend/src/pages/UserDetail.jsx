import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function UserDetail() {
  const { id } = useParams();

  const navigate =useNavigate()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-lg">User Detail</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button onClick={()=>navigate(`/users/${id}/edit`)}> Edit</button>
      {user.role=='student'?<button onClick={()=>navigate(`/mycourses`)}> view courses</button>:<></>} 

    </div>
  );
}