import React, { useEffect, useState, useRef, useCallback } from "react";
import { ExternalLink, ArrowUp } from "lucide-react";

function Document() {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const observer = useRef();

  const fetchDocuments = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`https://vercel-backend-66m8.onrender.com/api/documents?page=${page}`);
      const data = await res.json();

      setDocuments((prev) => {
        const combined = [...prev, ...(Array.isArray(data.documents) ? data.documents : [])];
        const unique = Array.from(new Map(combined.map(item => [item._id, item])).values());
        return unique;
      });

      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || page);
    } catch {
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(1);
  }, []);

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          fetchDocuments(currentPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, currentPage, totalPages]
  );

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Government Document Services
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4">
        {documents.length > 0 ? (
          documents.map((doc, index) => {
            const content = (
              <div
                className="p-4 border rounded-2xl shadow hover:shadow-lg transition bg-white"
                key={doc._id}
              >
                <h2 className="text-lg font-semibold text-blue-600">
                  {doc.title}
                </h2>

                <div className="mt-1 text-sm text-gray-600">
                  {doc.category} — {doc.serviceType}
                </div>

                <p className="mt-2 text-sm text-gray-700">{doc.description}</p>

                <div className="mt-3">
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Go to Service <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            );

            return documents.length === index + 1 ? (
              <div ref={lastItemRef} key={`${doc._id}-last`}>
                {content}
              </div>
            ) : (
              content
            );
          })
        ) : (
          !error && <p className="text-center text-gray-500">No documents found.</p>
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600" />
        </div>
      )}

      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition z-50"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default Document;
