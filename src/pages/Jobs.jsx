import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs(1, true);
  }, []);

  const fetchJobs = async (pageToFetch = 1, replace = false) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/jobs?page=${pageToFetch}`);
      const data = await res.json();

      const newJobs = Array.isArray(data.jobs) ? data.jobs : [];

      setJobs((prev) => {
        const allJobs = replace ? newJobs : [...prev, ...newJobs];
        const unique = Array.from(new Map(allJobs.map(job => [job._id, job])).values());
        return unique;
      });

      setPage(data.currentPage || pageToFetch);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchJobs(page + 1);
    }
  };

  const jobCategories = [
    "All", "SSC", "Railway", "Banking", "UPSC",
    "Defence", "Medical", "Engineering", "State govt", "Central govt"
  ];

  const filteredJobs = jobs.filter((job) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm) ||
      job.department?.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      job.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Latest Government Jobs</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or department..."
          className="w-full max-w-md p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {jobCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
        {loading && page === 1 ? (
          <p className="text-center py-8">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-4">{error}</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-600 py-4">No jobs found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold">Job Title</th>
                <th className="text-left px-6 py-3 text-sm font-semibold">Category</th>
                <th className="text-left px-6 py-3 text-sm font-semibold">Last Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.map((job) => {
                const departmentSlug = job.department
                  ? job.department.toLowerCase().replace(/\s+/g, "-")
                  : "unknown";
                const jobSlug = job.slug || job._id;

                return (
                  <tr key={job._id} className="hover:bg-indigo-50 transition">
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      <Link to={`/jobs/${departmentSlug}/${jobSlug}`}>
                        {job.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-800 capitalize">{job.category || "—"}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {job.lastDate
                        ? new Date(job.lastDate).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Load More Button */}
      {page < totalPages && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md shadow-md transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
