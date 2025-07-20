import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Calendar, FileText } from "lucide-react"; // Optional: lucide icons

const Home = () => {
  const [jobListings, setJobListings] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = [
    "bg-gradient-to-r from-blue-500 to-indigo-600",
    "bg-gradient-to-r from-red-500 to-pink-600",
    "bg-gradient-to-r from-green-500 to-emerald-600",
    "bg-gradient-to-r from-purple-500 to-violet-600",
    "bg-gradient-to-r from-yellow-500 to-orange-500",
    "bg-gradient-to-r from-teal-500 to-cyan-600",
    "bg-gradient-to-r from-pink-500 to-rose-600",
    "bg-gradient-to-r from-indigo-500 to-fuchsia-600",
  ];

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch("https://vercel-backend-66m8.onrender.com/api/jobs/latest");
        const data = await response.json();
        if (data.success && Array.isArray(data.jobs)) {
          setJobListings(data.jobs);
        } else {
          throw new Error("Invalid job data");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again later.");
        setJobListings([]);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  const homeCategories = [
    { name: "Result", path: "/result" },
    { name: "Admit Card", path: "/admit-card" },
    { name: "Answer Key", path: "/answer-key" },
    { name: "Admission", path: "/admission" },
    { name: "Documents", path: "/documents" },
  ];

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-14 px-4 rounded-xl shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2">Find Your Dream Sarkari Job</h1>
        <p className="text-lg font-light tracking-wide">Get the latest updates on government jobs, results, and more.</p>
      </div>

      {/* Category Buttons */}
      <div className="mt-8 flex justify-center flex-wrap gap-4">
        {homeCategories.map((category, i) => (
          <Link
            key={i}
            to={category.path}
            className="bg-white border border-gray-300 shadow hover:shadow-md px-5 py-2 rounded-full font-medium text-gray-700 hover:bg-blue-50 transition-all duration-200"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Latest Jobs */}
      <div className="mt-14">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🔥 Latest Jobs</h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading latest jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobListings.slice(0, visibleCount).map((job, index) => (
                <Link
                  key={job._id}
                  to={`/job/${job._id}`}
                  className={`p-6 rounded-xl text-white font-semibold text-lg shadow-lg hover:scale-[1.03] transition-transform duration-200 ease-in-out ${colors[index % colors.length]}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase size={20} />
                    {job.title}
                  </div>
                  <div className="text-sm font-normal text-white/90 mt-1">
                    {job.department || job.category}
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < jobListings.length && (
              <div className="text-center mt-8">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md font-medium"
                >
                  Load More Jobs
                </button>
              </div>
            )}

            {/* View All Jobs */}
            <div className="text-center mt-4">
              <Link
                to="/jobs"
                className="text-indigo-600 hover:underline font-medium text-sm"
              >
                → View All Jobs
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
