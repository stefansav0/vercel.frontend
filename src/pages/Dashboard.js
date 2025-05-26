import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {user ? (
        <p className="text-lg">Welcome, <strong>{user.email}</strong> 👋</p>
      ) : (
        <p className="text-lg">Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
