import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const DocumentDetail = () => {
  const { slug } = useParams();
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://vercel-backend-66m8.onrender.com/api/documents/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.slug) setDoc(data);
        else setError("Document not found.");
      })
      .catch(() => setError("Failed to load document."));
  }, [slug]);

  if (error) return <div className="text-center text-red-600 mt-8">{error}</div>;
  if (!doc) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{doc.title}</h1>

      <p className="text-gray-700 mb-6">{doc.description}</p>

      <div className="border p-4 rounded bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-blue-600 mb-3">Important Link</h2>
        <ul className="space-y-2 list-disc pl-5 text-gray-800 text-sm">
          <li>
            <a
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              Visit Service Page <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </li>
        </ul>
      </div>

      <div className="text-center mt-6">
        <Link to="/documents" className="text-blue-600 hover:underline font-medium">
          ← Back to Documents
        </Link>
      </div>
    </div>
  );
};

export default DocumentDetail;
