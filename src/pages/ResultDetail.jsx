import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ExternalLink } from "lucide-react";

const ResultDetail = () => {
  const { slug } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://vercel-backend-66m8.onrender.com/api/results/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.slug) {
          setResult(data);
        } else {
          setError("Result not found");
        }
      })
      .catch(() => setError("Failed to load result"));
  }, [slug]);

  if (error)
    return <div className="text-center text-red-500 mt-8">{error}</div>;

  if (!result)
    return (
      <div className="text-center mt-8 text-gray-500 animate-pulse">
        Loading result...
      </div>
    );

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{result.title}</h1>

      <div className="space-y-2 text-gray-700 text-sm mb-6">
        {result.conductedBy && (
          <p>
            <strong>Conducted By:</strong> {result.conductedBy}
          </p>
        )}
        {result.examDate && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Exam Date: {result.examDate}
          </p>
        )}
        {result.resultDate && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Result Date: {result.resultDate}
          </p>
        )}
        {result.postDate && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Published On: {new Date(result.postDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Notice Section */}
      {result.shortInfo && (
        <section className="border p-4 rounded mb-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Notice</h2>
          <p>{result.shortInfo}</p>
        </section>
      )}

      {/* How to Check Result */}
      {result.howToCheck && (
        <section className="border p-4 rounded mb-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            How to Check Result
          </h2>
          <p>{result.howToCheck}</p>
        </section>
      )}

      {/* Important Links */}
      {result.importantLinks?.length > 0 && (
        <section className="border p-4 rounded mb-4 bg-white">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Important Links
          </h2>
          <ul className="space-y-2">
            {result.importantLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  {link.label} <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Back Link */}
      <div className="text-center mt-6">
        <Link to="/result" className="text-blue-600 hover:underline font-medium">
          ← Back to Results
        </Link>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-8 text-sm text-gray-700">
        <p className="font-semibold text-lg mb-2 text-blue-600">
          Welcome to our official website on Finderight!
        </p>
        <p className="mb-4">
          Through this website, you can easily get information related to the latest
          Job Recruitments, Admissions, Results, Admit Cards, Answer Keys, And News.
          Bookmark our site and stay connected with us for updates.
        </p>

        <hr className="my-4" />

        <p className="text-red-600 text-xs">
          <strong>Disclaimer:</strong> The examination results, marks, and job
          listings published on this website are for information to
          candidates and do not constitute a legal document. While we strive to
          provide accurate information, we are not responsible for any inadvertent
          errors or discrepancies. Kindly verify official notifications and
          information from the respective official portals before proceeding.
        </p>
      </div>
    </main>
  );
};

export default ResultDetail;
