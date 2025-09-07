import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ExternalLink } from "lucide-react";
import DOMPurify from "dompurify";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://vercel-backend-66m8.onrender.com";


const DocumentDetail = () => {
  const { slug } = useParams();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setError("Invalid document request");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchDocument = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admissions/${slug}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error("Document not found");
        }
        const data = await res.json();
        if (data && data._id) {
          setDocument(data);
        } else {
          setError("Document not found");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load document");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();

    return () => controller.abort();
  }, [slug]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? null : date.toLocaleDateString("en-GB");
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{document.title}</h1>

      {/* Basic Information */}
      <div className="space-y-2 text-gray-700 text-sm mb-6">
        {document.conductedBy && <p><strong>Conducted By:</strong> {document.conductedBy}</p>}
        {document.eligibility && <p><strong>Eligibility:</strong> {document.eligibility}</p>}
        {document.ageLimit && <p><strong>Age Limit:</strong> {document.ageLimit}</p>}
        {document.course && <p><strong>Courses:</strong> {document.course}</p>}

        {document.applicationFee && (
          <div>
            <strong>Application Fee:</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(document.applicationFee || ""),
              }}
            />
          </div>
        )}

        {document.publishDate && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Published: {formatDate(document.publishDate)}
          </p>
        )}
      </div>

      {/* Full Course Details */}
      {document.fullCourseDetails && (
        <div className="border p-4 rounded mb-4 bg-white shadow-sm overflow-auto">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Full Course Details</h2>
          <div
            className="text-sm text-gray-800 prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(document.fullCourseDetails || ""),
            }}
          />
        </div>
      )}

      {/* Important Links Section */}
      {document.importantLinks && Object.keys(document.importantLinks).length > 0 && (
        <div className="border p-4 rounded mb-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Important Links</h2>
          <ul className="space-y-2 list-disc pl-5">
            {Object.entries(document.importantLinks).map(([key, value]) =>
              value ? (
                <li key={key}>
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    {key.replace(/([A-Z])/g, " $1")} <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      {/* Back Link */}
      <div className="text-center mt-6">
        <Link to="/admission" className="text-blue-600 hover:underline font-medium">
          ← Back to admission list
        </Link>
      </div>
    </div>
  );
};

export default DocumentDetail;
