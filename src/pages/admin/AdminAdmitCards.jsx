import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminAdmitCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCards = async () => {
    try {
      const res = await fetch("https://vercel-backend-66m8.onrender.com/api/admit-cards");
      const data = await res.json();
      if (res.ok) {
        setCards(data.admitCards || []);
      } else {
        throw new Error(data.message || "Failed to load admit cards");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admit card?")) return;
    try {
      const res = await fetch(`https://vercel-backend-66m8.onrender.com/api/admit-cards/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Admit card deleted");
        setCards(cards.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Error deleting admit card");
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Admit Cards</h1>
        <Link to="/admin/add-admit-card" className="bg-green-600 text-white px-4 py-2 rounded shadow">
          ➕ Add Admit Card
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : cards.length === 0 ? (
        <p>No admit cards found.</p>
      ) : (
        <div className="grid gap-4">
          {cards.map((card) => (
            <div key={card._id} className="p-4 border rounded shadow flex justify-between bg-white">
              <div>
                <h2 className="font-bold text-blue-600">{card.title}</h2>
                <p>{card.examName}</p>
                <p className="text-sm text-gray-500">Published: {card.publishedOn}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/edit-admit-card/${card._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  ✏️ Edit
                </Link>
                <button onClick={() => handleDelete(card._id)} className="bg-red-600 text-white px-3 py-1 rounded">
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

export default AdminAdmitCards;
