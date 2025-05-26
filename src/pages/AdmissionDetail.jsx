import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ExternalLink } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const AdmissionDetail = () => {
  const { slug } = useParams();
  const [admission, setAdmission] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/admissions/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setAdmission(data);
        } else {
          setError("Admission not found");
        }
      })
      .catch(() => setError("Failed to load admission"));
  }, [slug]);

  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!admission) return <div className="text-center mt-8">Loading...</div>;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? null : date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{admission.title}</h1>

      <div className="space-y-2 text-gray-700 text-sm mb-6">
        {admission.conductedBy && (
          <p><strong>Conducted By:</strong> {admission.conductedBy}</p>
        )}
        {admission.eligibility && <p><strong>Eligibility:</strong> {admission.eligibility}</p>}
        {admission.ageLimit && <p><strong>Age Limit:</strong> {admission.ageLimit}</p>}
        {admission.course && <p><strong>Course:</strong> {admission.course}</p>}
        {admission.applicationBegin && (
          <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> Application Begin: {formatDate(admission.applicationBegin)}</p>
        )}
        {admission.lastDateApply && (
          <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> Last Date to Apply: {formatDate(admission.lastDateApply)}</p>
        )}
        {admission.admissionDate && (
          <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> Admission Date: {admission.admissionDate}</p>
        )}
        {admission.examDate && (
          <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> Exam Date: {formatDate(admission.examDate)}</p>
        )}
        {admission.publishDate && (
          <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> Published: {formatDate(admission.publishDate)}</p>
        )}

        
      </div>

      {/* Admission Details */}
      <div className="border p-4 rounded mb-4 bg-gray-50">
        <ul className="space-y-1 text-gray-800">
         
          {admission.applicationFee && (
            <li><strong>Application Fee:</strong> <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(admission.applicationFee) }} /></li>
          )}
          
        </ul>
      </div>

      {/* Full Course Details */}
      {admission.fullCourseDetails && (
        <div className="border p-4 rounded mb-4 bg-white shadow-sm overflow-auto">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Full Course Details</h2>
          <div
            className="text-sm text-gray-800 prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(admission.fullCourseDetails),
            }}
          />
        </div>
      )}

      {/* Important Links */}
      {admission.importantLinks && (
        <div className="border p-4 rounded mb-4 bg-white">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Important Links</h2>
          <ul className="space-y-2 list-disc pl-5">
            {admission.importantLinks.applyOnline && (
              <li>
                <a href={admission.importantLinks.applyOnline} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  Apply Online <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
            {admission.importantLinks.downloadNotification && (
              <li>
                <a href={admission.importantLinks.downloadNotification} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  Download Notification <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
            {admission.importantLinks.downloadNotice && (
              <li>
                <a href={admission.importantLinks.downloadNotice} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  Download Notice <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
            {admission.importantLinks.officialWebsite && (
              <li>
                <a href={admission.importantLinks.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  Official Website <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center mt-6">
        <Link to="/admission" className="text-blue-600 hover:underline font-medium">
          ← Back to Admissions
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
    </div>
  );
};

export default AdmissionDetail;
