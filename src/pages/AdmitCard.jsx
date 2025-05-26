import React, { useEffect, useState, useRef, useCallback } from "react";
import { ExternalLink, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

function AdmitCard() {
  const [admitCards, setAdmitCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const observer = useRef();

  const fetchAdmitCards = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/admit-cards?page=${page}`);
      const data = await res.json();

      setAdmitCards((prev) => {
        const combined = [...prev, ...(Array.isArray(data.admitCards) ? data.admitCards : [])];
        const unique = Array.from(new Map(combined.map(item => [item._id, item])).values());
        return unique;
      });

      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || page);
    } catch {
      setError("Failed to load admit cards.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmitCards(1);
  }, []);

  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          fetchAdmitCards(currentPage + 1);
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
        Latest Admit Card Downloads
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4">
        {admitCards.length > 0 ? (
          admitCards.map((card, index) => {
            const cardContent = (
              <div
                className="p-4 border rounded-2xl shadow hover:shadow-lg transition bg-white"
                key={card._id}
              >
                <Link
                  to={`/admit-card/${card.slug}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {card.title}
                </Link>

                {/* Date hidden by removing this section */}
                {/* <div className="text-sm text-gray-500 mt-1 flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {new Date(card.publishDate).toLocaleDateString()}
                </div> */}

                <div className="mt-3">
                  <Link
                    to={`/admit-card/${card.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Download Admit Card <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            );

            return admitCards.length === index + 1 ? (
              <div ref={lastCardRef} key={`${card._id}-last`}>
                {cardContent}
              </div>
            ) : (
              cardContent
            );
          })
        ) : (
          !error && <p className="text-center text-gray-500">No admit cards available.</p>
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

export default AdmitCard;
