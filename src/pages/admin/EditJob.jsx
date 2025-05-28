import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [secret, setSecret] = useState("");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        alert("❌ Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleInput = (e, section, key) => {
    const { name, value } = e.target;
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key || name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://vercel-backend-66m8.onrender.com/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("✅ Job updated successfully!");
      navigate("/admin/jobs");
    } else {
      alert("❌ Failed to update job");
    }
  };

  if (!auth) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">🔐 Admin Access</h1>
        <input
          type="password"
          value={secret}
          placeholder="Enter secret key"
          onChange={(e) => setSecret(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={() => {
            if (secret === import.meta.env.VITE_ADMIN_SECRET) {
              setAuth(true);
            } else {
              alert("❌ Wrong secret");
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Unlock Form
        </button>
      </div>
    );
  }

  if (loading || !formData) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">✏️ Edit Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title || ""} onChange={handleInput} className="input" placeholder="Title" />
        <input name="department" value={formData.department || ""} onChange={handleInput} className="input" placeholder="Department" />
        <input name="eligibility" value={formData.eligibility || ""} onChange={handleInput} className="input" placeholder="Eligibility" />
        <input name="category" value={formData.category || ""} onChange={handleInput} className="input" placeholder="Category" />
        <input name="jobType" value={formData.jobType || ""} onChange={handleInput} className="input" placeholder="Job Type" />
        <input name="ageLimit" value={formData.ageLimit || ""} onChange={handleInput} className="input" placeholder="Age Limit" />
        <input name="location" value={formData.location || ""} onChange={handleInput} className="input" placeholder="Location" />
        <input name="lastDate" value={formData.lastDate?.slice(0, 10) || ""} onChange={handleInput} className="input" placeholder="Last Date" />
        <textarea name="description" value={formData.description || ""} onChange={handleInput} className="input" placeholder="Description" />

        {/* Fees */}
        <div className="grid grid-cols-2 gap-4">
          {["General", "OBC", "SC", "ST"].map((cat) => (
            <input
              key={cat}
              value={formData.fees?.[cat] || ""}
              onChange={(e) => handleInput(e, "fees", cat)}
              placeholder={`Fee - ${cat}`}
              className="input"
            />
          ))}
        </div>

        {/* Vacancy */}
        <div className="grid grid-cols-2 gap-4">
          {["General", "OBC", "SC", "ST"].map((cat) => (
            <input
              key={cat}
              value={formData.vacancy?.[cat] || ""}
              onChange={(e) => handleInput(e, "vacancy", cat)}
              placeholder={`Vacancy - ${cat}`}
              className="input"
            />
          ))}
        </div>

        {/* Important Dates */}
        {Object.entries(formData.importantDates || {}).map(([field, value]) => (
          <input
            key={field}
            name={field}
            value={value}
            onChange={(e) => handleInput(e, "importantDates", field)}
            placeholder={`Date - ${field}`}
            className="input"
          />
        ))}

        {/* Important Links */}
        {Object.entries(formData.importantLinks || {}).map(([field, value]) => (
          <input
            key={field}
            name={field}
            value={value}
            onChange={(e) => handleInput(e, "importantLinks", field)}
            placeholder={`Link - ${field}`}
            className="input"
          />
        ))}

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          💾 Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
