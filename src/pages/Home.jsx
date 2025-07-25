import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import CopilotAI from "../components/CopilotAI"; // ✅ Imported AI Assistant

const Home = () => {
  const [jobListings, setJobListings] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false); // ✅ Chat toggle state

  const colors = [
    "bg-gradient-to-r from-blue-600 to-indigo-600",
    "bg-gradient-to-r from-pink-500 to-rose-500",
    "bg-gradient-to-r from-green-600 to-teal-500",
    "bg-gradient-to-r from-purple-600 to-fuchsia-500",
    "bg-gradient-to-r from-yellow-500 to-orange-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-red-500 to-pink-600",
  ];

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetch("https://vercel-backend-66m8.onrender.com/api/jobs/latest");
        const data = await res.json();
        if (data.success && Array.isArray(data.jobs)) {
          setJobListings(data.jobs);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError("Something went wrong while fetching jobs.");
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
    <div className="max-w-screen-xl mx-auto px-4 py-12 relative">
      {/* Hero */}
      <div className="text-center py-14 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Find Your Dream Sarkari Job
        </h1>
        <p className="text-lg md:text-xl text-white/90">
          Get the latest updates on government jobs, results, admit cards, and more.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {homeCategories.map((cat, i) => (
          <Link
            key={i}
            to={cat.path}
            className="px-6 py-2 text-sm md:text-base rounded-full border border-gray-300 bg-white hover:bg-blue-50 hover:text-blue-700 font-medium shadow-sm transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Latest Jobs */}
      <section className="mt-14">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Latest Jobs</h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobListings.length ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobListings.slice(0, visibleCount).map((job, index) => (
                <Link
                  key={job._id}
                  to={`/job/${job._id}`}
                  className={`p-5 rounded-xl text-white shadow-md transition-transform hover:scale-[1.02] duration-200 ${colors[index % colors.length]}`}
                >
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Briefcase className="w-5 h-5" />
                    {job.title}
                  </div>
                  <p className="mt-1 text-sm font-light text-white/90">
                    {job.department || job.category}
                  </p>
                </Link>
              ))}
            </div>

            {visibleCount < jobListings.length && (
              <div className="text-center mt-10">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg"
                >
                  Load More Jobs
                </button>
              </div>
            )}

            <div className="text-center mt-6">
              <Link
                to="/jobs"
                className="text-indigo-600 hover:underline text-sm font-medium"
              >
                → View All Jobs
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </section>

      {/* ✅ Floating AI Button and Box */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg"
          onClick={() => setShowChatbot(!showChatbot)}
        >
          {showChatbot ? "Close AI" : "Ask AI"}
        </button>
      </div>

      {showChatbot && (
        <div className="fixed bottom-20 right-4 z-50 max-w-md w-full bg-white border rounded-xl shadow-lg">
          <CopilotAI />
        </div>
      )}
    </div>
  );
};

export default Home;
