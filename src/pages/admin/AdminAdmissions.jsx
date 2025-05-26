import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdmissions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admissions");
      const data = await res.json();
      if (res.ok) {
        setAdmissions(data.admissions || []);
      } else {
        throw new Error(data.message || "Failed to load admissions");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admission notice?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admissions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Admission deleted");
        setAdmissions(admissions.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Error deleting admission");
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Admissions</h1>
        <Link to="/admin/add-admission" className="bg-green-600 text-white px-4 py-2 rounded shadow">
          ➕ Add Admission
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : admissions.length === 0 ? (
        <p>No admissions found.</p>
      ) : (
        <div className="grid gap-4">
          {admissions.map((item) => (
            <div key={item._id} className="p-4 border rounded shadow flex justify-between bg-white">
              <div>
                <h2 className="font-bold text-blue-600">{item.title}</h2>
                <p>{item.collegeName}</p>
                <p className="text-sm text-gray-500">Published: {item.publishedOn}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/edit-admission/${item._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  ✏️ Edit
                </Link>
                <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAdmissions;
