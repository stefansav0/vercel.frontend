import React from "react";
import { useParams, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const documentData = {
  aadhaar: {
    title: "Aadhaar Card Services",
    description: "Aadhaar is a 12-digit unique identity number issued by UIDAI. You can apply, download, or update your Aadhaar online.",
    links: [
      { label: "Download Aadhaar", url: "https://myaadhaar.uidai.gov.in/genricDownloadAadhaar" },
      { label: "Check Aadhaar Status", url: "https://myaadhaar.uidai.gov.in/checkAadhaarStatus" },
      { label: "Book Update Appointment", url: "https://appointments.uidai.gov.in/" },
    ],
  },
  pan: {
    title: "PAN Card Services",
    description: "Permanent Account Number (PAN) is used for all financial transactions. You can apply for a new PAN or download an e-PAN.",
    links: [
      { label: "Apply for PAN", url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
      { label: "Download e-PAN", url: "https://www.incometax.gov.in/iec/foportal/" },
    ],
  },
  epfo: {
    title: "EPFO Services",
    description: "EPFO manages provident fund for Indian employees. You can activate UAN, check your balance, or download passbook.",
    links: [
      { label: "Activate UAN", url: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/" },
      { label: "Check EPFO Balance", url: "https://passbook.epfindia.gov.in/MemberPassBook/Login.jsp" },
    ],
  },
  esic: {
    title: "ESIC Services",
    description: "Employees' State Insurance Corporation offers medical benefits. You can download and activate your ESIC e-card.",
    links: [
      { label: "Download ESIC Card", url: "https://www.esic.in/ESICInsurance1/ESICInsurancePortal/PortalLogin.aspx" },
    ],
  },
  ayushman: {
    title: "Ayushman Bharat Card",
    description: "Ayushman Bharat Yojana provides health coverage to eligible families. Check eligibility, apply, or download card.",
    links: [
      { label: "Check Eligibility", url: "https://beneficiary.nha.gov.in/" },
      { label: "Download Ayushman Card", url: "https://pmjay.gov.in/" },
    ],
  },
};

const DocumentDetail = () => {
  const { slug } = useParams();
  const doc = documentData[slug];

  if (!doc) {
    return (
      <div className="text-center text-red-600 mt-8">
        Document information not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{doc.title}</h1>

      <p className="text-gray-700 mb-6">{doc.description}</p>

      <div className="border p-4 rounded bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-blue-600 mb-3">Important Links</h2>
        <ul className="space-y-2 list-disc pl-5 text-gray-800 text-sm">
          {doc.links.map((link, idx) => (
            <li key={idx}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                {link.label} <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </li>
          ))}
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
