import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User tried to access a non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-6xl font-bold text-rose-600 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-6 font-medium">Oops! Page not found</p>
        <p className="text-slate-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;