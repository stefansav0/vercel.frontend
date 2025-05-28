import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RedirectToSlug = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlug = async () => {
      try {
        const res = await fetch(`https://vercel-backend-66m8.onrender.com/api/jobs/${id}`);
        const data = await res.json();

        if (res.ok && data.job) {
          const { department, slug } = data.job;
          navigate(`/${department.toLowerCase()}/${slug}`, { replace: true });
        } else {
          navigate("/not-found", { replace: true });
        }
      } catch (error) {
        navigate("/not-found", { replace: true });
      }
    };

    fetchSlug();
  }, [id, navigate]);

  return <p className="text-center">Redirecting to job detail...</p>;
};

export default RedirectToSlug;
