import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ExternalLink } from "lucide-react";

const AdmitCardDetail = () => {
  const { slug } = useParams();
  const [admitCard, setAdmitCard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://vercel-backend-66m8.onrender.com/api/admit-cards/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.slug) {
          setAdmitCard(data);
        } else {
          setError("Admit Card not found");
        }
      })
      .catch(() => setError("Failed to load admit card"));
  }, [slug]);

  if (error)
    return <div className="text-center text-red-500 mt-8">{error}</div>;

  if (!admitCard)
    return (
      <div className="text-center mt-8 text-gray-500 animate-pulse">
        Loading admit card...
      </div>
    );

  return (
    <main className="max-w-3xl mx-auto p-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        {admitCard.title}
      </h1>

      {/* Conducted By */}
      {admitCard.conductedby && (
  <p className="text-gray-800 mb-4">
    <strong>Conducted By:</strong> {admitCard.conductedby}
  </p>
)}


      {/* All Dates Section */}
      <div className="space-y-1 text-gray-700 text-sm mb-6">
        {admitCard.applicationBegin && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Application Begin: {admitCard.applicationBegin}
          </p>
        )}
        {admitCard.lastDateApply && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Last Date to Apply: {admitCard.lastDateApply}
          </p>
        )}
        {admitCard.admitCard && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Admit Card Release: {admitCard.admitCard}
          </p>
        )}
        {admitCard.examDate && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Exam Date: {admitCard.examDate}
          </p>
        )}
        {admitCard.publishDate && (
          <p className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Published On:{" "}
            {new Date(admitCard.publishDate).toLocaleDateString("en-IN")}
          </p>
        )}
      </div>

      {/* Description Section */}
      {admitCard.description && (
        <section className="border p-4 rounded mb-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Description
          </h2>
          <p>{admitCard.description}</p>
        </section>
      )}

      {/* How to Download Section */}
      {admitCard.howToDownload && (
        <section className="border p-4 rounded mb-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            How to Download
          </h2>
          <p>{admitCard.howToDownload}</p>
        </section>
      )}

      {/* Important Links */}
      {admitCard.importantLinks && (
        <section className="border p-4 rounded mb-4 bg-white">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Important Links
          </h2>
          <ul className="space-y-2">
            {admitCard.importantLinks.applyOnline && (
              <li>
                <a
                  href={admitCard.importantLinks.applyOnline}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  Apply Online <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
            {admitCard.importantLinks.downloadAdmitCard && (
              <li>
                <a
                  href={admitCard.importantLinks.downloadAdmitCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  Download Admit Card <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
            {admitCard.importantLinks.officialWebsite && (
              <li>
                <a
                  href={admitCard.importantLinks.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  Official Website <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Back Button */}
      <div className="text-center mt-6">
        <Link
          to="/admit-card"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to Admit Cards
        </Link>
      </div>

      {/* Footer Disclaimer */}
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

export default AdmitCardDetail;
