import axios from "axios";

// ✅ Set Backend API URL with a proper fallback
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://vercel-backend-66m8.onrender.com";
const API_URL = new URL("/api/jobs", BASE_URL).toString();

/**
 * 🔍 Fetch all jobs (Supports filters & pagination)
 * @param {Object} params - Filtering and pagination options
 * @returns {Promise<Object>} - { jobs: [], total: 0 }
 */
export const fetchJobs = async ({ category = "", page = 1, limit = 10 } = {}) => {
  try {
    console.log("🔍 Fetching jobs...", { category, page, limit });

    const response = await axios.get(API_URL, {
      params: { category, page, limit },
    });

    console.log("✅ API Response (fetchJobs):", response.data);

    if (response.status === 200 && response.data?.jobs) {
      return response.data; // ✅ Return job listings
    }

    console.warn("⚠️ Unexpected response format in fetchJobs:", response.data);
    return { jobs: [], total: 0 }; // ✅ Prevent errors
  } catch (error) {
    return handleApiError(error, "fetchJobs");
  }
};

/**
 * 🔍 Fetch latest jobs
 * @returns {Promise<Object[]>} - Latest job listings
 */
export const fetchLatestJobs = async () => {
  try {
    console.log("🔍 Fetching latest jobs...");

    const response = await axios.get(`${API_URL}/latest`);

    console.log("✅ API Response (fetchLatestJobs):", response.data);

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data; // ✅ Return latest job listings
    }

    console.warn("⚠️ Unexpected response format in fetchLatestJobs:", response.data);
    return { jobs: [] };
  } catch (error) {
    return handleApiError(error, "fetchLatestJobs");
  }
};

/**
 * ❌ Handle API Errors
 * @param {Object} error - Axios error object
 * @param {String} functionName - Function name where error occurred
 * @returns {Object} - { error: "Error message" }
 */
const handleApiError = (error, functionName) => {
  if (error.response) {
    console.error(
      `❌ API Error in ${functionName}:`,
      error.response.status,
      error.response.data
    );
    return { error: `API Error: ${error.response.data?.message || "Something went wrong"}` };
  } else if (error.request) {
    console.error(`❌ Network Error in ${functionName}: No response from server`);
    return { error: "Network Error: No response from server" };
  } else {
    console.error(`❌ Unexpected Error in ${functionName}:`, error.message);
    return { error: `Unexpected Error: ${error.message}` };
  }
};
