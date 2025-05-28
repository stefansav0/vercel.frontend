import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudyNewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://vercel-backend-66m8.onrender.com/api/study-news")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);

        if (data && Array.isArray(data.newsList)) {
          setNews(data.newsList);
        } else {
          throw new Error("Unexpected response format");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load study news.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading study news...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 border-b-2 border-blue-600 pb-2">
        📚 Study News
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {news.map((item) => (
          <Link
            key={item._id}
            to={`/study-news/${item.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden flex flex-col"
          >
            {item.coverImage && (
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
            )}
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold text-blue-700 hover:underline line-clamp-2">
                {item.title}
              </h2>

              {/* Removed Admin + Date Line */}

              <p className="text-gray-700 mt-3 line-clamp-3">
                {item.excerpt}
              </p>

              <div className="mt-auto pt-4 text-blue-600 text-sm font-medium hover:underline">
                Read more →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudyNewsList;
