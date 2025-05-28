import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobListings, setJobListings] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = [
    "bg-blue-700", "bg-red-600", "bg-green-700", "bg-pink-600",
    "bg-indigo-700", "bg-yellow-600", "bg-purple-700", "bg-orange-600",
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
  ];

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero */}
      <div className="text-center bg-blue-600 text-white py-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Find Your Dream Sarkari Job</h1>
        <p className="mt-2 text-lg">Get the latest government job updates.</p>
      </div>

      {/* Category Buttons */}
      <div className="mt-6 flex justify-center flex-wrap gap-4">
        {homeCategories.map((category, i) => (
          <Link
            key={i}
            to={category.path}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Latest Jobs */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Latest Jobs
        </h2>

        {loading ? (
          <p className="text-center animate-pulse">Loading latest jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {jobListings.slice(0, visibleCount).map((job, index) => (
                <Link
                  key={job._id}
                  to={`/job/${job._id}`}
                  className={`p-5 rounded-xl text-white font-bold text-lg shadow-md hover:scale-105 transition duration-200 ${colors[index % colors.length]}`}
                >
                  {job.title}
                  <div className="text-sm font-normal mt-1">
                    {job.department || job.category}
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < jobListings.length && (
              <div className="text-center mt-6">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Show More Jobs
                </button>
              </div>
            )}

            {/* View All Jobs */}
            <div className="text-center mt-4">
              <Link
                to="/jobs"
                className="text-blue-600 hover:underline font-medium text-sm"
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
