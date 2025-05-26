import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminAnswerKeys = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnswerKeys = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/answer-keys");
      const data = await res.json();
      if (res.ok) {
        setKeys(data.answerKeys || []);
      } else {
        throw new Error(data.message || "Failed to load answer keys");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this answer key?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/answer-keys/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Answer key deleted");
        setKeys(keys.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Error deleting answer key");
    }
  };

  useEffect(() => {
    fetchAnswerKeys();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Answer Keys</h1>
        <Link to="/admin/add-answer-key" className="bg-green-600 text-white px-4 py-2 rounded shadow">
          ➕ Add Answer Key
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : keys.length === 0 ? (
        <p>No answer keys found.</p>
      ) : (
        <div className="grid gap-4">
          {keys.map((item) => (
            <div key={item._id} className="p-4 border rounded shadow flex justify-between bg-white">
              <div>
                <h2 className="font-bold text-blue-600">{item.title}</h2>
                <p>{item.examName}</p>
                <p className="text-sm text-gray-500">Published: {item.publishedOn}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/edit-answer-key/${item._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
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

export default AdminAnswerKeys;
