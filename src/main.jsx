import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthContext";

// Optional: You can create a global error boundary (recommended for larger apps)
// import ErrorBoundary from "./components/ErrorBoundary"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* Optional error wrapper if you build one */}
        {/* <ErrorBoundary> */}
          <App />
        {/* </ErrorBoundary> */}
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
