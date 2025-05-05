import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await api.get('/users/current');
        setUserId(userRes.data._id);
      } catch {
        setUserId(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (userId) {
          const res = await api.get(`/users/${userId}/courses`);
          setCourses(res.data);
        }
      } catch (error) {
        console.error("Error fetching my courses:", error);
      }
    };
    fetchCourses();
  }, [userId]);

  return (
    <div className="p-4">
      <h1 className="text-lg mb-4">My Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
}