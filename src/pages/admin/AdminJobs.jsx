import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await fetch("https://vercel-backend-66m8.onrender.com/api/jobs");
      const data = await res.json();
      if (res.ok) {
        setJobs(data.jobs || []);
      } else {
        throw new Error(data.message || "Failed to load jobs");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`https://vercel-backend-66m8.onrender.com/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Job deleted successfully");
        setJobs(jobs.filter((job) => job._id !== id));
      } else {
        alert("Failed to delete job");
      }
    } catch (err) {
      alert("Error deleting job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Jobs</h1>
        <Link
          to="/admin/add-job"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          ➕ Add New Job
        </Link>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded p-4 shadow-md bg-white flex justify-between items-start"
            >
              <div>
                <h2 className="font-bold text-lg text-blue-600">{job.title}</h2>
                <p className="text-gray-600">{job.department}</p>
                <p className="text-sm text-gray-400">{job.category}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/edit-job/${job._id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
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

export default AdminJobs;
