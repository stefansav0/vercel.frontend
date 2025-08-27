import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ExternalLink } from "lucide-react";
import DOMPurify from "dompurify";

const DocumentDetail = () => {
  const { slug } = useParams();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://vercel-backend-66m8.onrender.com/api/admissions/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setDocument(data);
        } else {
          setError("Document not found");
        }
      })
      .catch(() => setError("Failed to load document"));
  }, [slug]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? null : date.toLocaleDateString("en-GB");
  };

  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!document) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{document.title}</h1>

      <div className="space-y-2 text-gray-700 text-sm mb-6">
        {document.documentType && <p><strong>Document Type:</strong> {document.documentType}</p>}
        {document.eligibility && <p><strong>Eligibility:</strong> {document.eligibility}</p>}
        {document.publishDate && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Published: {formatDate(document.publishDate)}
          </p>
        )}
      </div>

      {document.details && (
        <div className="border p-4 rounded mb-4 bg-white shadow-sm overflow-auto">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Details</h2>
          <div
            className="text-sm text-gray-800 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(document.details) }}
          />
        </div>
      )}

      {document.importantLinks && (
        <div className="border p-4 rounded mb-4 bg-white">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Important Links</h2>
          <ul className="space-y-2 list-disc pl-5">
            {document.importantLinks.apply && (
              <li>
                <a href={document.importantLinks.apply} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  Apply Online <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
            {document.importantLinks.download && (
              <li>
                <a href={document.importantLinks.download} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  Download <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
            {document.importantLinks.officialWebsite && (
              <li>
                <a href={document.importantLinks.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  Official Website <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="text-center mt-6">
        <Link to="/documents" className="text-blue-600 hover:underline font-medium">
          ← Back to Documents
        </Link>
      </div>

      <div className="text-center mt-8 text-sm text-gray-700">
        <p className="font-semibold text-lg mb-2 text-blue-600">
          Welcome to our official website on Finderight!
        </p>
        <p className="mb-4">
          Through this website, you can easily get information related to the latest
          Job Recruitments, Admissions, Results, Admit Cards, Answer Keys, Documents,
          and more. Bookmark our site and stay connected with us for updates.
        </p>
        <hr className="my-4" />
        <p className="text-red-600 text-xs">
          <strong>Disclaimer:</strong> We do not generate any government documents. All links provided are official or publicly accessible portals. Always verify through the original website before submitting any personal details.
        </p>
      </div>
    </div>
  );
};

export default DocumentDetail;
