import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CourseEdit() {
  const { id } = useParams();
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/courses/${id}`, { withCredentials: true })
      .then(res => setName(res.data.name));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/v1/courses/${id}`, { name }, { withCredentials: true });
    alert("Course updated successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}